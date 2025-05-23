import { useState } from "react";
import UploadFileButton from "../../components/UplaodFileButton";
import { UploadFile } from "antd";
import { profilePicture } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { getUserIdFromToken } from "../../utils/userIdDecode";
import { Bounce, toast } from "react-toastify";
import PublicHeader from "../../layout/PublicHeader";
import { useNavigate } from "react-router-dom";
import { updateProfilePicture } from "../../store/userSlice";
type FilePicture = {
  file?: string | File;
};

const Profile = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const userID = getUserIdFromToken();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FilePicture>({
    file: undefined,
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const navigate = useNavigate();
  const handleFileChange = (files: UploadFile[]) => {
    setFileList(files);
    if (files.length > 0 && files[0].originFileObj) {
      setForm({ file: files[0].originFileObj as File });
    } else {
      setForm({ file: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (form.file) {
      formData.append("file", form.file);
    }
    try {
      setLoading(true);
      const res = await profilePicture(
        user.user.token,
        userID as string,
        formData
      );
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      const newPictureURL = res.data.user.picture;
      setLoading(false);
      setFileList([]);
      setForm({ file: undefined });
      dispatch(updateProfilePicture(newPictureURL));
      navigate("/");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  // console.log(form.file);
  // console.log(fileList);

  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-[var(--color-background-dark)]">
      <nav>
        <PublicHeader classname="bg-background dark:bg-soft-dark dark:text-text-dark md:bg-transparent w-full md:static border-b border-gray-600 shadow-md p-1" />
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-[var(--color-soft-dark)] rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">
              Update Profile Picture
            </h1>
            <p className="text-[var(--color-text)] dark:text-[var(--color-text-dark)] mt-2">
              Choose a new profile picture to represent you
            </p>
          </div>
          {/* Current Profile Preview */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              {user.user.picture ? (
                <img
                  src={user.user.picture}
                  alt="Current profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl text-gray-400">👤</span>
                </div>
              )}
            </div>
          </div>

          {/* Upload Form */}
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <UploadFileButton
                  onFileChange={handleFileChange}
                  fileList={fileList}
                />
                {form.file === "" && (
                  <p className="text-red-500 text-sm mt-2">
                    Please select a profile picture
                  </p>
                )}
              </div>

              {/* Guidelines */}
              <div className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)] bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Upload Guidelines:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Maximum file size: 5MB</li>
                  <li>Supported formats: JPG, PNG, WEBP</li>
                  <li>Recommended resolution: 200x200 pixels</li>
                </ul>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading || !form.file}
                className={`
                  px-8 py-3 rounded-lg font-semibold text-white
                  transition-all duration-300 transform hover:scale-105
                  ${
                    loading || !form.file
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] hover:bg-[var(--color-primary)] dark:hover:bg-[var(--color-primary-dark)]"
                  }
                `}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Updating...
                  </div>
                ) : (
                  "Update Profile Picture"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Profile;
