import { IUserType } from "@/types/User";

export type LinkType = {
  url: string;
  linkName: string;
};

export const NAV_LINKS: { [Key in IUserType]: LinkType[] } = {
   admin: [
    { linkName: "Dashboard", url: "/admin/dashboard" },
    { linkName: "Seasons", url: "/admin/season" },
    { linkName: "League", url: "/admin/league" },
    { linkName: "Teams", url: "/admin/teams" },
    { linkName: "Matches", url: "/admin/matches" },
    { linkName: "News", url: "/admin/news" },
    { linkName: "Players", url: "/admin/players" },
  ],
};
