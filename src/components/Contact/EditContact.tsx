import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "redux";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

interface EditContactProps {
  contacts: Contact[];
  updateContact: (data: Contact) => void;
}

const EditContact: React.FC<EditContactProps> = ({
  contacts,
  updateContact,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currentContact: Contact | undefined = contacts.find(
    (contact) => contact.id === parseInt(id as string)
  );

  useEffect(() => {
    if (currentContact) {
      setFirstName(currentContact.firstName);
      setLastName(currentContact.lastName);
      setStatus(currentContact.status);
    }
  }, [currentContact]);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentContact) {
      const data = {
        id: currentContact.id,
        lastName,
        firstName,
        status,
      };
      updateContact(data);
      navigate("/contact");
    }
  };
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="bg-white p-8 rounded-md shadow-md">
        {currentContact ? (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center mb-4">
              <label htmlFor="name" className="w-1/4 whitespace-no-wrap">
                First Name:
              </label>
              <input
                type="text"
                id="name"
                className="w-3/4 p-2 border border-gray-400 rounded-md shadow-sm ml-5"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="name" className="w-1/4 whitespace-no-wrap">
                Last Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-3/4 p-2 border border-gray-400 rounded-md shadow-sm ml-5"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="status" className="w-1/4 whitespace-no-wrap">
                Status:
              </label>
              <div className="ml-5 flex flex-col">
                <label htmlFor="active" className="mr-4 p-1">
                  <input
                    type="radio"
                    id="active"
                    name="status"
                    value="active"
                    checked={status === "active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  Active
                </label>
                <label htmlFor="inactive" className="mr-4 p-1">
                  <input
                    type="radio"
                    id="inactive"
                    name="status"
                    value="inactive"
                    checked={status === "inactive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  Inactive
                </label>
              </div>
            </div>
            <div className="form-group d-flex align-items-center justify-content-between my-2 flex">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md flex justify-center mr-auto"
              >
                Save Edited Contact
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex justify-center"
                onClick={() => navigate("/contact")}
              >
                cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="card mb-3" style={{ width: "40rem" }}>
            <div className="p-4 flex items-center">
              <span
                style={{
                  borderRadius: "50%",
                  backgroundColor: "black",
                  border: "8px solid black",
                  color: "white",
                  marginRight: "20px",
                }}
              >
                <ImCross />
              </span>
              <span>
                No Contact Found Please add contact from Create Contact Button
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateContact: (data: Contact) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
