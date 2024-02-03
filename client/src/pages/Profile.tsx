/* import { useState } from "react";

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [homeAddress, setHomeAddress] = useState("123 Main St, City, Country");
  const [workAddress, setWorkAddress] = useState(
    "456 Business Ave, City, Country"
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add code to handle form submission (e.g., send data to server)
    // ...
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4 text-black">Update Profile</h2>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="profileImage" className="block mb-2 text-black">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            id="profileImage"
            onChange={handleImageUpload}
            className="border p-2 w-full"
          />
          {profileImage && (
            <img
              src={profileImage}
              alt="Profile"
              className="mt-2 w-20 h-20 rounded-full"
            />
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-black">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-black">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            readOnly
            className="border p-2 w-full bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 text-black">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="homeAddress" className="block mb-2 text-black">
            Home Address
          </label>
          <input
            type="text"
            id="homeAddress"
            value={homeAddress}
            onChange={(e) => setHomeAddress(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="workAddress" className="block mb-2 text-black">
            Work Address
          </label>
          <input
            type="text"
            id="workAddress"
            value={workAddress}
            onChange={(e) => setWorkAddress(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
 */