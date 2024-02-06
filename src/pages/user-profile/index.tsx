import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi"
import { useDispatch, useSelector } from "react-redux"
import { resetUser, selectCurrent } from "../../features/user/userSlice"
import { Button, Card, Image } from "@nextui-org/react"
import { MdOutlinePersonAddAlt1 } from "react-icons/md"
import { MdOutlinePersonAddDisabled } from "react-icons/md"
import { useDisclosure } from "@nextui-org/react"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../app/services/followApi"
import { GoBack } from "../../components/go-back"
import { BASE_URL } from "../../constants"
import { CiEdit } from "react-icons/ci"
import { EditProfile } from "../../components/edit-profile"
import { formatToClientDate } from "../../utils/format-to-client-date"

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useSelector(selectCurrent)
  const { data } = useGetUserByIdQuery(id ?? "")
  const [followUser] = useFollowUserMutation()
  const [unfolowUser] = useUnfollowUserMutation()
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  const dispatch = useDispatch()

  useEffect(
    () => () => {
      dispatch(resetUser())
    },
    [],
  )

  const handleFollow = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unfolowUser(id).unwrap()
          : await followUser({ followingId: id }).unwrap()

        await triggerGetUserByIdQuery(id)

        await triggerCurrentQuery()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserByIdQuery(id)
        await triggerCurrentQuery()
        onClose()
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (!data) {
    return null
  }

  return (
    <>
      <GoBack />
      <Card className="flex flex-col items-center text-center space-y-4 p-5">
        <Image
          src={`${BASE_URL}${data.avatarUrl}`}
          alt={data.name}
          width={200}
          height={200}
          className="border-4 border-white"
        />
        <div className="flex text-2xl font-bold gap-4 items-center">
          {data.name}
          {currentUser?.id !== id ? (
            <Button
              color={data?.isFollowing ? "default" : "primary"}
              variant="flat"
              className="gap-2"
              onClick={handleFollow}
              isIconOnly
              endContent={
                data?.isFollowing ? (
                  <MdOutlinePersonAddDisabled />
                ) : (
                  <MdOutlinePersonAddAlt1 />
                )
              }
            />
          ) : (
            <Button
              endContent={<CiEdit />}
              isIconOnly
              onClick={() => onOpen()}
            />
          )}
        </div>
        <p className="font-semibold">{data.email}</p>
        {/* <p className="font-semibold">{data.email}</p>
        {data.dateOfBirth && <p className="italic">{formatToClientDate(data.dateOfBirth)}</p>}
        <p className="italic">{data.bio}</p>
        <p className="italic">
          {data.location}
        </p> */}
        <div className="flex justify-between w-200">
          <p>{data.bio}</p>
          {data.dateOfBirth && <p className="italic">{formatToClientDate(data.dateOfBirth)}</p>}
        </div>
      </Card>
      <EditProfile isOpen={isOpen} onClose={handleClose} user={data}/>
    </>
  )
}
