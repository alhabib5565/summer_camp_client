
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useSelectClass from '../../hooks/useSelectClass';
import Loader from '../../components/Loader';
import SelectTable from './SelectTable';
import NoData from '../../components/NoData';
const SelectedClass = () => {
    const [seleteClass, refetch, isLoading] = useSelectClass()
    const [axiosSecure] = useAxiosSecure()

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't remove this class",
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
                                'Deleted from bookmark.',
                                'success'
                            )
                        }
                    })

            }
        })
    }

    return (
        <div className='max-w-3xl mx-auto p-4 mt-12'>

            {
                seleteClass.length < 1 ? <NoData link={'/allClass'} linkName={'Add Bookmark Now'} subTitle='Please add to bookmark' title='You have no bookmark class'></NoData> :
                    <div>
                        <h2 className='text-2xl md:text-4xl text-center my-4 font-bold'>Your have {seleteClass.length} selected class</h2>
                        <div className="overflow-x-auto rounded bg-cyan-100">

                            <table className="table">
                                <thead className="justify-between">
                                    <tr className="bg-cyan-600">
                                        <th className="px-4 py-2">
                                            <span className="text-gray-100 font-semibold">#</span>
                                        </th>
                                        <th className="px-4 py-2">
                                            <span className="text-gray-100 font-semibold whitespace-nowrap">Instructor Name</span>
                                        </th>
                                        <th className="px-4 py-2">
                                            <span className="text-gray-100 font-semibold whitespace-nowrap">Class Name</span>
                                        </th>
                                        <th className="px-4 py-2">
                                            <span className="text-gray-100 font-semibold">Price</span>
                                        </th>
                                        <th className="px-4 py-2">
                                            <span className="text-gray-100 font-semibold">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        seleteClass.map((sClas, index) => <SelectTable key={index} index={index} sClas={sClas} handleDelete={handleDelete}></SelectTable>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </div>
    );
};

export default SelectedClass;