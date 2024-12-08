import { IUser } from "./User";

export interface IBaseResponse {
  code: string | number;
  message: string;
  error?: any;
  status?: string | number;
}

export interface ITeam {
  name: string;
  logo: string;
  _id?: string;
  own?: boolean;
}

export interface ISeason {
  name: string;
  leagues?: ILeague[];
  createdAt?: string
}

export interface IPlayer {
  first_name: string;
  last_name: string;
  position: any;
  goals: string;
  //team: string;
  appearance: string;
  image: string;
  number: string;
  _id?: string;
}

export interface ILeague {
  name: string;
  logo: string;
  competition: string;
  _id?: string;
  createdAt?: string
}

export interface INews {
  head_line: string;
  news: string;
  image: string;
  _id?: string;
  createdAt?: string;
}

export interface ILoginUserRequest {
  email?: string;
  password: string;
  phone?: string | number;
}

export interface ILoginUserResponse extends IBaseResponse {
  token: string;
  data: IUser;
}

export interface IMatchRequest {
  date: string;
  team: string;
  league: string;
  season: string;
  posotion: string;
}

export interface IMatchResponse {
  date: string;
  home_team: ITeam;
  away_team: ITeam;
  league: ILeague;
  season: string;
  stat: string;
  is_played: boolean;
  _id: string;
}

export type GoalType = "penalty" | "normal_goal";

export interface IGoal {
  player: IPlayer;
  time: string;
  team: string;
  match: string;
  type: GoalType;
  opposite_player: string;
}

export type IEventType = "foul" | "yellow_card" | "red_card";
export type IAward = "free_kick" | "penalty" | "corner_kick" | "none";

export interface IEvent {
  player: string;
  time: string;
  favoured_team: string;
  unnfavoured_team: string;
  match: string;
  event_type: IEventType;
  event_award: IAward;
}

export interface IStat {
  team: string;
  match: string;
  player: string;
  position: string;
  is_subtitle: boolean;
}

export interface IHome {
  last_played_match: {
    match: IMatchResponse;
    home_goals: string | number;
    away_goals: string | number;
  };
  next_match: {
    match: IMatchResponse;
  };
  news: INews[];
  players: IPlayer[];
  upcoming_matches: IMatchResponse[];
}

export interface IGetAllMatchesResponse extends IBaseResponse {
  data?: IMatchResponse[];
}

export interface IGetAllTeamsResponse extends IBaseResponse {
  data?: ITeam[];
}

export interface IGetAllLeagueResponse extends IBaseResponse {
  data?: ILeague[];
}

export interface IGetAllPlayerResponse extends IBaseResponse {
  data?: IPlayer[];
}

export interface IGetAllNewsResponse extends IBaseResponse {
  data?: INews[];
}
export interface IGetOneNewsResponse extends IBaseResponse {
  data?: INews;
}

export interface IGetHomeData extends IBaseResponse {
  data?: IHome;
}

export interface IGetOneMatchDetails extends IBaseResponse {
  data?: {
    stats: IStat[];
    match: IMatchResponse;
    events: IEvent[];
    goals: IGoal[];
  };
}
