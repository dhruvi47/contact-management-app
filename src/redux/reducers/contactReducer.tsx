const savedState = localStorage.getItem("contacts")
  ? JSON.parse(localStorage.getItem("contacts") as any)
  : [];
  
interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

type ContactAction =
  | { type: "ADD_CONTACT"; payload: Contact }
  | { type: "DELETE_CONTACT"; payload: number }
  | { type: "UPDATE_CONTACT"; payload: Contact }
  | { type: "RESET_CONTACT" };


export const contactReducer = (state:Contact[] = savedState, action:ContactAction) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      // save the updated state to local storage
      localStorage.setItem("contacts", JSON.stringify(state));
      return state;
    case "DELETE_CONTACT":
      const contactFilter = state.filter((contact) =>
        contact.id === action.payload ? null : contact
      );
      state = contactFilter;
      // save the updated state to local storage
      localStorage.setItem("contacts", JSON.stringify(state));
      return state;
    case "UPDATE_CONTACT":
      const contactUpdate = state.filter((contact) =>
        contact.id === action.payload.id
          ? Object.assign(contact, action.payload)
          : contact
      );
      state = contactUpdate;
      // save the updated state to local storage
      localStorage.setItem("contacts", JSON.stringify(state));
      return state;
    case "RESET_CONTACT":
      state = [{ id:-1 ,firstName: "", lastName: "", status: "" }];
      // save the updated state to local storage
      localStorage.setItem("contacts", JSON.stringify(state));
      return state;
    default:
      return state;
  }
};