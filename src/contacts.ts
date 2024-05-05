export type Contact = {
  id: string
  first: string
  last: string
  avatar: string
  twitter: string
  notes: string
  favorite: boolean
}

const contacts: Contact[] = [
  {
    id: generateId(),
    first: "Some",
    last: "One",
    avatar: "https://placekitten.com/200/200",
    twitter: "@some_handle",
    notes: "Some notes",
    favorite: true,
  },
  {
    id: generateId(),
    first: "Another",
    last: "One",
    avatar: "https://placekitten.com/200/200",
    twitter: "@another_handle",
    notes: "Some notes",
    favorite: false,
  },
]

export const getContacts = (q?: string | null) => {
  return (
    new Promise<Contact[]>((resolve) => {
      if (q) {
        resolve(
          contacts.filter((contact) => {
            return contact.first.toLowerCase().includes(q.toLowerCase())
          })
        )
      }
      resolve(contacts)
    })
  )
}

export const getContact = (id: string | undefined) => {
  return (
    new Promise<Contact | undefined>((resolve) => {
      if (id) {
        resolve(contacts.find((contact) => contact.id === id))
      }
      resolve(undefined)
    })
  )
}

export const createContact = () => {
  return (
    new Promise<Contact>((resolve) => {
      const newContact: Contact = {
        id: generateId(),
        first: "",
        last: "",
        avatar: "",
        twitter: "",
        notes: "",
        favorite: false,
      }
      contacts.push(newContact)
      resolve(newContact)
    })
  )
}

export const updateContact = (id: string | undefined, updates: Partial<Contact>) => {
  return (
    new Promise<Contact | undefined>((resolve) => {
      if (id) {
        const contact = contacts.find((contact) => contact.id === id)
        if (contact) {
          Object.assign(contact, updates)
          resolve(contact)
        }
      }
      resolve(undefined)
    })
  )
}

export const deleteContact = (id: string | undefined) => {
  return (
    new Promise<void>((resolve) => {
      if (id) {
        contacts.splice(
          contacts.findIndex((contact) => contact.id === id),
          1
        )
        resolve()
      }
      resolve(undefined)
    })
  )
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
