
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useSelectClass from '../../hooks/useSelectClass';
import Loader from '../../components/Loader';
import SelectTable from './SelectTable';
const SelectedClass = () => {
    const [seleteClass, refetch, isLoading] = useSelectClass()
    const [axiosSecure] = useAxiosSecure()
   
    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/select/delete/${id}`)
                    .then(res => {
                        console.log('deleted res', res.data);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })
    }

    return (
        <div className='max-w-3xl mx-auto p-4'>
            <h2 className='text-2xl md:text-4xl my-4 font-bold'>Your Select Class:  <span className='text-purple-500 font-bold'>{seleteClass.length}</span></h2>
            {
                isLoading ? <Loader></Loader> :
                    <div className="overflow-x-auto rounded bg-purple-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th> #</th>
                                    <th>image</th>
                                    <th>Name</th>
                                    <th>price</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    seleteClass.map((sClas, index) => <SelectTable key={index} index={index} sClas={sClas} handleDelete={handleDelete}></SelectTable>)
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default SelectedClass;