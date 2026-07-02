import ConversationFallback from '@/components/shared/conversation/ConversationFallback'
import ItemList from '@/components/shared/item-list/ItemList'
import AddFriendDialog from './_components/AddFriendDialog'

type Props = {}

const FriendsPage = (props: Props) => {
  return (
    <>
      <ItemList title='FriendsPage' action={<AddFriendDialog />}>
        FriendsPage
      </ItemList>
      <ConversationFallback />
    </>
  )
}

export default FriendsPage