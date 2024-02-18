import { create } from 'zustand';

const useConversation = create((set) => ({
    selectedConverstion: null,
    setSelectedConversation: (selectedConverstion) => set({selectedConverstion}),
    messages:[],
    setMessage: (messages) => set({messages}),

}))

export default useConversation;