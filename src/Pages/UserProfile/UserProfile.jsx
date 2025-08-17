import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useCurrentUser from '../../Hooks/useCurrentUser';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../Components/Loading/Loading';
import uploadImageToImgbb from '../../Hooks/uploadImageToImgbb';
import { useQueryClient } from '@tanstack/react-query';
import useAuthContext from '../../Hooks/useAuthContext';
import useTitle from '../../Hooks/useTitle';

const UserProfile = () => {
  const { user, isLoading } = useCurrentUser();
  const {updateUser} = useAuthContext();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue } = useForm();
  useTitle('my-profile')
const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewImg, setPreviewImg] = useState(user?.photoURL || '');

  useEffect(() => {
    if (user?.name) setValue('name', user.name);
    if (user?.photoURL) {
      setValue('photoURL', user.photoURL);
      setPreviewImg(user.photoURL);
    }
  }, [user, setValue]);

  if (isLoading || !user) return <Loading />;

  const { name, email, lastLogin } = user;

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImageToImgbb(file);
      setPreviewImg(url);
      setValue('photoURL', url);
      Swal.fire('Success', 'Image uploaded successfully!', 'success');
    } catch {
      Swal.fire('Error', 'Image upload failed!', 'error');
    } finally {
      setUploading(false);
    }
  };

 const onSubmit = async (data) => {
  try {
    // Update backend DB
    const res = await axiosSecure.put(`/users/${user._id}`, {
      name: data.name,
      photoURL: data.photoURL,
      email: email,
    });

    if (res.data.modifiedCount > 0) {
      // ✅ Update Firebase profile too
      await updateUser({
        displayName: data.name,
        photoURL: data.photoURL,
      });
      // setUser({...user,displayName: data.name, photoURL:data.photoURL});

      Swal.fire('Success', 'Profile updated successfully', 'success');

      // ✅ Refetch currentUser to update UI from DB
      queryClient.invalidateQueries(['currentUser']);
      setModalOpen(false);
    } else {
      Swal.fire('Info', 'No changes detected', 'info');
    }
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'Failed to update profile', 'error');
  }
};


  return (
    <div className="max-w-4xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-md">
      {/* User info */}
      <div className="flex items-center justify-between gap-6">
        {/* Left: name, email, last login */}
        <div>
          <h2 className="text-3xl font-bold mb-2">{name}</h2>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Email:</span> {email}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Last Login:</span>{' '}
            {new Date(lastLogin).toLocaleString()}
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-primary mt-4"
          >
            Edit Profile
          </button>
        </div>

        {/* Right: User Image */}
        <div>
          <img
            src={previewImg || 'https://via.placeholder.com/150'}
            alt="User"
            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
          />
        </div>
      </div>

      {/* Modal for editing */}
      {modalOpen && (
        <>
          <input
            type="checkbox"
            id="edit-profile-modal"
            className="modal-toggle"
            checked={modalOpen}
            readOnly
          />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Edit Profile</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Name</label>
                  <input
                    {...register('name')}
                    className="input input-bordered w-full"
                    placeholder="Your Name"
                    required
                  />
                </div>


                <div>
                  <label className="block mb-1 font-medium">
                    Upload New Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploading}
                    className="file-input file-input-bordered w-full"
                  />
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`btn btn-primary ${uploading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
