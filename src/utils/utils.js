import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios"

export const handleBookmark = (clas, user, refetch) => {
    if (user && user.email) {
        const { className, price, photo, _id, instructorName, instructorEmail } = clas
        const selectClass = { classId: _id, className, photo, instructorName,instructorEmail, price, studentEmail: user.email, studentName: user.displayName }
        fetch('https://assignmenttwelv.vercel.app/select', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(selectClass)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Add to bookmark',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    refetch()
                }else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Already bookmark',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    } else {
        Swal.fire({
            title: 'Please login to select a class',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        })
    }
}

export const remainingDays = (enrollStartDate, enrollEndDate) => {
    const enrollStart = moment(enrollStartDate, "YYYY-MM-DD HH:mm");
    const enrollEnd = moment(enrollEndDate, "YYYY-MM-DD HH:mm");
    const duration = moment.duration(enrollEnd.diff(enrollStart));
    return duration._data.days
}

// console.log(import.meta.env)
export const imageUpload = async (image) => {
    const formData = new FormData()
    formData.append('image', image)
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
    console.log(response)
    return response.data.data
}