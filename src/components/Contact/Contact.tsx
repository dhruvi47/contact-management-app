import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { Dispatch } from "redux";

interface ContactList {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

interface ContactProps {
  contacts: ContactList[];
  deleteContact: (id: number) => void;
}

const Contact: React.FC<ContactProps> = ({ contacts, deleteContact }) => {
  return (
    <>
      <Link
        to="/contact/add"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  max-w-md"
        style={{ display: "flex", margin: "10px auto", width: "150px" }}
      >
        Create Contact
      </Link>
      <div className="container d-flex flex-wrap mt-20">
        {contacts?.length > 0 ? (
          contacts.map((contact, index) => {
            return (
              <div
                className="bg-white rounded-lg shadow-md overflow-hidden"
                key={index}
                style={{ display: "flex", margin: "20px auto" }}
              >
                <div className="card mb-3" style={{ width: "25rem" }}>
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">
                      Contact Details {index + 1}
                    </h2>
                    <div className="mb-4">
                      <label
                        htmlFor="label1"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        FirstName : <span> {contact.firstName}</span>
                      </label>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="label2"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        LastName : <span> {contact.lastName}</span>
                      </label>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="label2"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Status :{" "}
                        <span
                          className={`${
                            contact.status === "active"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {contact.status}
                        </span>
                      </label>
                    </div>

                    <div className="flex">
                      <Link
                        to={`/contact/edit/${contact.id}`}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => deleteContact(contact.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <div
              className="bg-white rounded-lg shadow-md overflow-hidden"
              style={{ display: "flex", margin: "5px auto" }}
            >
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
                    No Contact Found Please add contact from Create Contact
                    Button
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  contacts: state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteContact: (id: number) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
