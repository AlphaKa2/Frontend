import React, { useState, useEffect } from "react";
import { participantsList, updateParticipantPermission, deleteParticipants } from "../api/travel-service/participants";
import { FaCrown } from "react-icons/fa"; // React Icons의 왕관 아이콘
import FriendInvitePopup from "./FriendInvitePopup"; // 초대 팝업 컴포넌트 import

const ParticipantsPopup = ({ travelId, onClose }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInvitePopup, setShowInvitePopup] = useState(false); // 초대 팝업 상태
  const [menuOpen, setMenuOpen] = useState(null); // 점 세개 메뉴 상태

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const data = await participantsList(travelId);
        setParticipants(data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [travelId]);

  const handlePermissionChange = async (participantId, newPermission) => {
    try {
      const updatedParticipant = await updateParticipantPermission(participantId, newPermission);
      setParticipants((prev) =>
        prev.map((participant) =>
          participant.participantId === participantId
            ? { ...participant, permission: updatedParticipant.permission }
            : participant
        )
      );
    } catch (error) {
      console.error("Error updating participant permission:", error);
    }
  };

  const handleDelete = async (participantId) => {
    try {
      await deleteParticipants(participantId);
      setParticipants((prev) =>
        prev.filter((participant) => participant.participantId !== participantId)
      );
    } catch (error) {
      console.error("Error deleting participant:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black bg-opacity-50">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-center">참여자 목록</h2>
        <p className="text-sm font-light mb-6 text-left text-gray-600">최대 6명까지 참여가 가능합니다</p>

        {/* Participant List */}
        <div className="space-y-3">
          {participants.map((participant, index) => (
            <div
              key={participant.participantId}
              className="flex items-center p-4 rounded-md relative"
              style={{
                marginLeft: index === 0 ? "0" : "24px", // 첫 번째 닉네임 기준으로 정렬
              }}
            >
              {/* 왕관 아이콘 추가 (첫 번째 참여자만) */}
              {index === 0 && (
                <FaCrown className="text-blue-500 text-xl mr-2" />
              )}

              {/* 닉네임 */}
              <span className="text-lg font-semibold text-blue-600">{participant.nickname}</span>

              {/* Action Menu */}
              <div className="ml-auto relative">
                {/* Dots Button */}
                <button
                  onClick={() =>
                    setMenuOpen(menuOpen === participant.participantId ? null : participant.participantId)
                  }
                  className="text-gray-600 hover:text-gray-800 text-2xl"
                >
                  ⋮
                </button>

                {/* Popup Menu */}
                {menuOpen === participant.participantId && (
                  <div className="absolute right-0 top-8 bg-white border rounded shadow-lg w-32 py-2 z-10">
                    <button
                      onClick={() =>
                        handlePermissionChange(
                          participant.participantId,
                          participant.permission === "EDIT" ? "VIEW" : "EDIT"
                        )
                      }
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {participant.permission === "EDIT" ? "권한: VIEW" : "권한: EDIT"}
                    </button>
                    <button
                      onClick={() => handleDelete(participant.participantId)}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      강퇴
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Invite Button */}
        <button
          onClick={() => setShowInvitePopup(true)}
          className="mt-6 w-full py-2 bg-blue-500 text-white rounded-md text-sm font-semibold hover:bg-blue-600"
        >
          참여자 초대
        </button>

        {/* Invite Popup */}
        {showInvitePopup && (
          <FriendInvitePopup
            travelId={travelId}
            onClose={() => setShowInvitePopup(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ParticipantsPopup;