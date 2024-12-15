import React, { useState, useEffect } from "react";
import {
  participantsList,
  updateParticipantPermission,
  deleteParticipants,
} from "../api/travel-service/participants";
import { FaCrown } from "react-icons/fa";
import FriendInvitePopup from "./FriendInvitePopup";

const ParticipantsPopup = ({ travelId, onClose, currentUserId }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

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

  const handlePermissionChange = async (participantId, currentPermission) => {
    const newPermission = currentPermission === "EDIT" ? "VIEW" : "EDIT";

    try {
      await updateParticipantPermission(participantId, newPermission);
      setParticipants((prev) =>
        prev.map((participant) =>
          participant.participantId === participantId
            ? { ...participant, permission: newPermission }
            : participant
        )
      );
    } catch (error) {
      console.error("Error updating participant permission:", error);
      alert("권한 변경 중 문제가 발생했습니다.");
    }
  };

  const handleDelete = async (participantId) => {
    const participant = participants.find((p) => p.participantId === participantId);

    if (participant && participant.userId === currentUserId) {
      alert("자기 자신은 강퇴할 수 없습니다!");
      return;
    }

    try {
      await deleteParticipants(participantId);
      setParticipants((prev) =>
        prev.filter((participant) => participant.participantId !== participantId)
      );
    } catch (error) {
      console.error("Error deleting participant:", error);
      alert("참여자를 강퇴하는 도중 문제가 발생했습니다.");
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
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">참여자 목록</h2>
        <p className="text-sm font-light mb-6 text-left text-gray-600">최대 6명까지 참여가 가능합니다</p>

        <div className="space-y-3">
          {participants.map((participant, index) => (
            <div
              key={participant.participantId}
              className="flex items-center p-4 rounded-md relative"
            >
              {/* 닉네임과 왕관 아이콘을 동일한 정렬 기준으로 묶음 */}
              <div className="flex items-center gap-2">
                {/* 왕관 아이콘: 첫 번째 참여자만 표시 */}
                {index === 0 && <FaCrown className="text-blue-500 text-xl" />}

                {/* 닉네임 및 권한 */}
                <span className="text-lg font-semibold text-blue-600">
                  {participant.nickname}{" "}
                  <span className="text-sm text-gray-500">
                    ({participant.permission === "EDIT" ? "Edit Mode" : "View Mode"})
                  </span>
                </span>
              </div>

              {/* Action Menu: 첫 번째 사용자는 제외 */}
              {index !== 0 && (
                <div className="ml-auto relative">
                  <button
                    onClick={() =>
                      setMenuOpen(menuOpen === participant.participantId ? null : participant.participantId)
                    }
                    className="text-gray-600 hover:text-gray-800 text-2xl"
                  >
                    ⋮
                  </button>

                  {menuOpen === participant.participantId && (
                    <div className="absolute right-0 top-8 bg-white border rounded shadow-lg w-32 py-2 z-10">
                      <button
                        onClick={() =>
                          handlePermissionChange(
                            participant.participantId,
                            participant.permission
                          )
                        }
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        {participant.permission === "EDIT" ? "View Mode 전환" : "Edit Mode 전환"}
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
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowInvitePopup(true)}
          className="mt-6 w-full py-2 bg-blue-500 text-white rounded-md text-sm font-semibold hover:bg-blue-600"
        >
          참여자 초대
        </button>

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
