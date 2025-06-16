import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import { getPlaceById } from "../services/Places";
import { useAuthStore } from "../store/authStore";
import { t } from "i18next";
export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const [placeName, setPlaceName] = useState("");

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const data = await getPlaceById(user.placeId);
        setPlaceName(data[0]?.name || "");
      } catch (error) {
        console.error(t("dashboard.error_place"), error);
      }
    };
    fetchPlace();
  }, [user]);

  const labelAndData = [
    { label: t("dashboard.name"), data: user?.name || "" },
    { label: t("dashboard.lastName"), data: user?.lastName || "" },
    { label: t("dashboard.ci"), data: String(user?.ci || "") },
    { label: t("dashboard.place"), data: placeName },
    { label: t("dashboard.numberPlace"), data: String(user?.numberPlace || "") },
    { label: t("dashboard.birthDate"), data: String(user?.birthDate || "") },
    { label: t("dashboard.hasVoted"), data: user?.hasVoted ? t("dashboard.voted") : t("dashboard.notVoted") },
  ];

  return (
    <>
      <h1 style={{ marginBlock: 0 }}>{t("dashboard.title")}</h1>
      <UserCard
        labelAndData={labelAndData}
        addPhoto={true}
        photoUrl={user.userPhoto}
      />
    </>
  );
}
