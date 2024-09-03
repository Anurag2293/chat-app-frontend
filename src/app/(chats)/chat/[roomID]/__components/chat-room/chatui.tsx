import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, MoreVertical, Phone, Video } from "lucide-react"

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there! How's it going?", sent: false },
    { id: 2, text: "Hi! I'm doing well, thanks for asking. How about you?", sent: true },
    { id: 3, text: "I'm good too! Just wanted to check in and see if you're still on for our meeting tomorrow at 2 PM?", sent: false },
    { id: 4, text: "I've got it marked in my calendar. Is there anything specific you'd like me to prepare for the meeting?", sent: true },
    { id: 5, text: "Great! If you could just review the project proposal we discussed last week, that would be perfect. We'll go over the main points and discuss any questions or concerns you might have.", sent: false },
    { id: 6, text: "Sounds good to me. I'll make sure to go through the proposal again before our meeting. Looking forward to it!", sent: true },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, sent: true }])
      setNewMessage("")
    }
  }

  return (
    <div className="flex flex-col h-screen w-full mx-auto border border-gray-200 shadow-lg">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">John Doe</h2>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sent
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm break-words">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex space-x-2"
        >
          <Input
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}