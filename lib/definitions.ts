export interface IHighlight {
  id: number;
  title: string;
  date: string;
  thumbnail: string;
  videoUrl: string;
}

export interface ILink {
  href: string;
  name: string;
}

export interface IArticle {
  id: string;
  title: string;
  createdAt: string;
  category: "match preview" | "match report" | "club news";
  image: string;
  match?: IMatch;
}

export interface ISocial {
  id: number;
  link: string;
  icon: string;
  name: string;
}

export interface IPositionStats {}

export interface IPlayerPosition {
  name: string;
  stats: unknown;
}

export interface IPlayer {
  id?: number;
  name: string;
  firstname?: string;
  lastname?: string;
  position: {
    long: string;
    short: string;
  };
  squad_no?: number;
  role: string;
  year_signed?: number;
  stats?: unknown;
  description?: string;
  dob?: string;
  height?: number;
  weight?: number;
  dominant_foot?: "Left" | "Right";
  image?: {
    home: string;
    away: string;
  };
  team?: number;
}

export interface IScorers {
  scorer: IPlayer;
  assist: IPlayer;
  time: string;
}

export interface ICompetitionPhase {
  group?: string;
  phase: "league" | "playoffs";
  standing_id?: number;
  finals?: string;
  total_teams?: number;
  fixtures?: string[];
}

export interface ICompetition {
  id: number;
  logo: string;
  phase_type: "league" | "cup";
  name: {
    short: string;
    long: string;
  };
  type: string;
  round: string | number;
  phases: ICompetitionPhase[];
  slug: string;
}

export interface IMatch {
  id: number;
  competition: ICompetition;
  home: {
    logo: string;
    name: string;
  };
  away: {
    logo: string;
    name: string;
  };
  date: string;
  location: string;
  time: string;
  status: string;
  lineup: IPlayer[];
  result: {
    home: number;
    away: number;
  };
  stats: {
    passes: {
      home: number;
      away: number;
    };
    offside: {
      home: number;
      away: number;
    };
    corners: {
      home: number;
      away: number;
    };
    shots: {
      home: number;
      away: number;
    };
    yellow_cards: {
      home: number;
      away: number;
    };
    red_cards: {
      home: number;
      away: number;
    };
  };
  scorers: IScorers[];
  mvp: IPlayer;
  preview: string;
  result_context: string;
  form: {
    home: string[];
    away: string[];
  };
  players_to_watch: {
    players: IPlayer[];
    note: string;
  };
}

export interface ITeam {
  name: { long: string; short: string };
  logo: string;
}

export interface IStandingTeam {
  team: ITeam;
  position: number;
  stats: {
    p: number;
    w: number;
    d: number;
    l: number;
    f: number;
    a: number;
    gd: string;
    pts: number;
  };
}
