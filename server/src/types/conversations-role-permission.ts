enum ServiceScopePermission {
  addParticipant = "addParticipant",
  createConversation = "createConversation",
  deleteAnyMessage = "deleteAnyMessage",
  deleteConversation = "deleteConversation",
  editAnyMessage = "editAnyMessage",
  editAnyMessageAttributes = "editAnyMessageAttributes",
  editAnyUserInfo = "editAnyUserInfo",
  editConversationAttributes = "editConversationAttributes",
  editConversationName = "editConversationName",
  editOwnMessage = "editOwnMessage",
  editOwnMessageAttributes = "editOwnMessageAttributes",
  editOwnUserInfo = "editOwnUserInfo",
  joinConversation = "joinConversation",
  removeParticipant = "removeParticipant",
}

enum ConversationScropePermission {
  AddParticipant = "addParticipant",
  DeleteAnyMessage = "deleteAnyMessage",
  DeleteOwnMessage = "deleteOwnMessage",
  DeleteConversation = "deleteConversation",
  EditAnyMessage = "editAnyMessage",
  EditAnyMessageAttributes = "editAnyMessageAttributes",
  EditAnyUserInfo = "editAnyUserInfo",
  EditConversationAttributes = "editConversationAttributes",
  EditConversationName = "editConversationName",
  EditOwnMessage = "editOwnMessage",
  EditOwnMessageAttributes = "editOwnMessageAttributes",
  EditOwnUserInfo = "editOwnUserInfo",
  LeaveConversation = "leaveConversation",
  RemoveParticipant = "removeParticipant",
  SendMediaMessage = "sendMediaMessage",
  SendMessage = "sendMessage",
}

export { ConversationScropePermission, ServiceScopePermission };
