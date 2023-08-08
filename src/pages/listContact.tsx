import { Table, Button } from "antd";
import { useState } from "react";
import { Contact } from "./newContact";
import { useNavigate } from "react-router-dom";

export default function ListContact() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState<Contact[]>(
    JSON.parse(localStorage.getItem("contacts") || "[]")
  );

  const handleDelete = (email: string) => {
    const updatedContacts = contacts.filter(
      (contact) => contact.email !== email
    );
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      sorter: (a: Contact, b: Contact) => a.name.localeCompare(b.name),
      filters: Array.from(new Set(contacts.map((item) => item.name))).map(
        (name) => ({ text: name, value: name })
      ),
      onFilter: (value: string | number | boolean, record: Contact) =>
        record.name.includes(value as string),
    },
    {
      title: "Электронная почта",
      dataIndex: "email",
      key: "email",
      sorter: (a: Contact, b: Contact) => a.email.localeCompare(b.email),
      filters: Array.from(new Set(contacts.map((item) => item.email))).map(
        (email) => ({ text: email, value: email })
      ),
      onFilter: (value: string | number | boolean, record: Contact) =>
        record.email.includes(value as string),
    },
    {
      title: "Пол",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Номер телефона",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (a: Contact, b: Contact) =>
        a.phoneNumber.localeCompare(b.phoneNumber),
      filters: Array.from(
        new Set(contacts.map((item) => item.phoneNumber))
      ).map((phone) => ({ text: phone, value: phone })),
      onFilter: (value: string | number | boolean, record: Contact) =>
        record.phoneNumber.includes(value as string),
    },
    {
      title: "Действия",
      key: "actions",
      render: (text: string, record: Contact) => (
        <Button danger onClick={() => handleDelete(record.email)}>
          Удалить
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => {
          navigate("/new_contact");
        }}
      >
        Добавить Контакты
      </Button>
      <Table dataSource={contacts} columns={columns} rowKey="email" />
    </div>
  );
}
