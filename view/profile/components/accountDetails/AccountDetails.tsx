import React, { useEffect, useState } from "react";
import { Icons } from "@/components/ui/icons/icons";
import Button from "@/components/ui/Button/Button";
import EmailEdit from "./components/EmailEdit";
import MobileEdit from "./components/MobileEdit";
import UserNameEdit from "./components/UserNameEdit";
import Modal from "@/components/ui/modal/Modal";

interface AccountDetailsProps {
  email: string;
  mob: string;
  username: string;
  is_premium?:boolean
}
const AccountDetails: React.FC<AccountDetailsProps> = ({
  email,
  mob,
  username,
  is_premium,
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const handleSave = (field: string, newValue: string) => {
    console.log(`Updated ${field}:`, newValue);
    setEditingField(null);
  };

  useEffect(() => {
    setIsPremiumUser(!!is_premium); 
  }, [is_premium]);
  return (
    <div className="bg-white shadow-md  border border-gray-100 p-normal mt-medium w-full lg:w-6/12">
      <h2 className="text-lg font-semibold text-primary">Account Details</h2>

      {/* Email Edit */}
      <div className="flex justify-between items-center mt-4">
        {editingField === "email" ? (
          <EmailEdit
            value={email || ""}
            onSave={(newValue) => handleSave("email", newValue)}
            onCancel={() => setEditingField(null)}
          />
        ) : (
          <>
            <div>
              <p className="text-xs lg:text-sm text-tsecond">Email Address</p>
              <p className="text-xs lg:text-md font-semibold text-visitorText">
                {email || "Not Available"}
              </p>
            </div>
            {isPremiumUser && email && (
              <Button
                bgNone
                width="w-10"
                onClick={() => setEditingField("email")}
              >
                <Icons.Edit />
              </Button>
            )}
          </>
        )}
      </div>

      {/* Mobile Edit */}
      {/* Mobile Edit - Always editable */}
      <div className="flex justify-between items-center mt-4">
        {editingField === "mob" ? (
          <MobileEdit
            value={mob || ""}
            onSave={(newValue) => handleSave("mob", newValue)}
            onCancel={() => setEditingField(null)}
          />
        ) : (
          <>
            <div>
              <p className="text-xs md:text-sm text-tsecond">Mobile Number</p>
              <p className="text-xs md:text-md font-semibold text-visitorText">
                {mob || "Not Available"}
              </p>
            </div>
            <Button bgNone width="w-10" onClick={() => setEditingField("mob")}>
              <Icons.Edit />
            </Button>
          </>
        )}
      </div>

      {/* Username Display */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-xs md:text-sm text-tsecond">User Name</p>
          <p className="text-xs md:text-md font-semibold text-visitorText">
            {username || "Not Available"}
          </p>
        </div>
        {isPremiumUser && username && (
          <Button
            bgNone
            width="w-10"
            onClick={() => setEditingField("username")}
          >
            <Icons.Edit />
          </Button>
        )}
      </div>

      {/* Username Edit Modal */}
      {editingField === "username" && (
        <Modal isOpen={true} onClose={() => setEditingField(null)}>
          <UserNameEdit useName={username} onClose={setEditingField} />
        </Modal>
      )}
    </div>
  );
};

export default AccountDetails;
