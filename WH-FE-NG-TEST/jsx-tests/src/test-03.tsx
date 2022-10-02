/**
 * In the following React template, create a simple form at the top that allows the user to enter in a first name, last name, and phone number and there should be a submit button. 
 * Once the submit button is pressed, the information should be displayed in a list below (automatically sorted by last name) along with all the previous information that was entered.
 * This way the application can function as a simple phone book. 
 * When your application loads, the input fields (not the phone book list) should be prepopulated with the following values already:
 * 
    First name = Coder
    Last name = Byte
    Phone = 8885559999
 * 
 */

    import React, { useState } from 'react';
    import ReactDOM from 'react-dom';
    
    const style = {
      table: {
        borderCollapse: "collapse",
      },
      tableCell: {
        border: "1px solid gray",
        margin: 0,
        padding: "5px 10px",
        width: "max-content",
        minWidth: "150px",
      },
      form: {
        container: {
          padding: "20px",
          border: "1px solid #F0F8FF",
          borderRadius: "15px",
          width: "max-content",
          marginBottom: "40px",
        },
        inputs: {
          marginBottom: "5px",
        },
        submitBtn: {
          marginTop: "10px",
          padding: "10px 15px",
          border: "none",
          backgroundColor: "lightseagreen",
          fontSize: "14px",
          borderRadius: "5px",
        },
      },
    } as const;
    
    interface Contact {
      userFirstName: string;
      userLastName: string;
      userPhone: string;
    }
    
    
    function PhoneBookForm({
      addEntryToPhoneBook,
    }) {
      const [userFirstName, setUserFirstName] = useState("Coder");
      const [userLastName, setUserLastName] = useState("Byte");
      const [userPhone, setUserPhone] = useState("8885559999");
    
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addEntryToPhoneBook({ userFirstName, userLastName, userPhone });
          }}
          style={style.form.container}
        >
          <label>First name:</label>
          <br />
          <input
            style={style.form.inputs}
            className="userFirstname"
            name="userFirstname"
            type="text"
            value={userFirstName}
            onChange={(e) => {
              setUserFirstName(e.target.value);
            }}
          />
          <br />
          <label>Last name:</label>
          <br />
          <input
            style={style.form.inputs}
            className="userLastname"
            name="userLastname"
            type="text"
            value={userLastName}
            onChange={(e) => {
              setUserLastName(e.target.value);
            }}
          />
          <br />
          <label>Phone:</label>
          <br />
          <input
            style={style.form.inputs}
            className="userPhone"
            name="userPhone"
            type="text"
            value={userPhone}
            onChange={(e) => {
              setUserPhone(e.target.value);
            }}
          />
          <br />
          <input
            style={style.form.submitBtn}
            className="submitButton"
            type="submit"
            value="Add User"
          />
        </form>
      );
    }
    
    function InformationTable(props) {
        return (
          <table style={style.table} className="informationTable">
            <thead>
              <tr>
                <th style={style.tableCell}>First name</th>
                <th style={style.tableCell}>Last name</th>
                <th style={style.tableCell}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {props.contacts.map((contact:Contact, i) => {
                return (
                  <tr key={"oo" + i}>
                    <th style={style.tableCell}>{contact.userFirstName}</th>
                    <th style={style.tableCell}>{contact.userLastName}</th>
                    <th style={style.tableCell}>{contact.userPhone}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
    }
    
    function Application(props) {
        const [contacts, setContacts]=useState<Contact[]>([])
    
        const handleAddEntryToPhoneBook=({userFirstName, userLastName, userPhone}:Contact)=>{
            const newContact = { userFirstName, userLastName, userPhone };
            let updatedContactList =[...contacts]
            const contactsCheck = contacts.filter(
              (contact) =>
                contact.userFirstName === userFirstName &&
                contact.userLastName === userLastName &&
                contact.userPhone === userPhone
            );
            if (contactsCheck.length > 0) {
            } else {
              updatedContactList = [...updatedContactList, newContact];
            }
            updatedContactList=updatedContactList.sort((contactA,contactB)=>{
                if (contactA.userLastName > contactB.userLastName) {
                  return 1;
                } else {
                  return -1;
                }
            })
            setContacts([...updatedContactList]);
    
        }
        return (
          <section>
            <PhoneBookForm addEntryToPhoneBook={handleAddEntryToPhoneBook} />
            <InformationTable contacts={contacts} />
          </section>
        );
    }
    
    ReactDOM.render(
        <Application />,
        document.getElementById('test-03')
    );