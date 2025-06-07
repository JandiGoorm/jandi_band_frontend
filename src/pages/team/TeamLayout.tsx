import { Route, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import { TeamDetailProvider } from "./detail/TeamDetailProvider";
import { Routes } from "react-router-dom";
import TeamDetail from "./detail/TeamDetail";
import CreateTimeTable from "./detail/CreateTimeTable";
import { useTeamStore } from "@/stores/teamStore";
import { useEffect } from "react";

const TeamLayout = () => {
  const { id } = useParams();
  const setTeamId = useTeamStore((state) => state.setTeamId);

  useEffect(() => {
    if (id) {
      setTeamId(Number(id));
    }
  }, [id, setTeamId]);

  const location = useLocation();
  const exitTransitionX = location.pathname.includes("/post/timetables")
    ? 70
    : -70;

  if (!id) return <div>존재 하지 않는 팀</div>;
  return (
    <DefaultLayout>
      <TeamDetailProvider teamId={id}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: exitTransitionX }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: exitTransitionX }}
            transition={{ duration: 0.5 }}
          >
            <Routes location={location}>
              <Route path="post/timetables" element={<CreateTimeTable />} />
              <Route path="" element={<TeamDetail />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </TeamDetailProvider>
    </DefaultLayout>
  );
};

export default TeamLayout;
