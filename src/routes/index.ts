import Index from './index.tsx'
import 
  Contact, { 
  loader as contactLoader,
  action as contactAction
} from './contact'
import 
  EditContact, { 
    loader as editLoader,
    action as editAction
} from './edit'
import 
  Root, { 
  loader as rootLoader, 
  action as rootAction
} from './root'
import { action as deleteAction } from './destroy'

export { 
  Root,
  Index,
  rootLoader, 
  rootAction,
  Contact,
  contactLoader,
  contactAction,
  EditContact,
  editLoader,
  editAction,
  deleteAction
}
