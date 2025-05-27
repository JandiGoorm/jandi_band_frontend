import { Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";
import { TeamDetailProvider } from "./detail/TeamDetailProvider";
import { AnimatePresence } from "framer-motion";
import { Routes } from "react-router-dom";
import { PageEndpoints } from "@/constants/endpoints";
import TeamDetail from "./detail/TeamDetail";
import CreateTimeTable from "./detail/CreateTimeTable";

const TeamLayout = () => {
  const location = useLocation();
  const exitTransitionX =
    location.pathname === PageEndpoints.TEAM_DETAIL ? 70 : -70;

  return (
    <DefaultLayout>
      <TeamDetailProvider>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: exitTransitionX }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: exitTransitionX }}
            transition={{ duration: 0.5 }}
          >
            <Routes location={location}>
              <Route path=":id" element={<TeamDetail />} />
              <Route path=":id/post/timetables" element={<CreateTimeTable />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </TeamDetailProvider>
    </DefaultLayout>
  );
};

export default TeamLayout;
