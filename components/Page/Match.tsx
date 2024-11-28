import { Box } from "@chakra-ui/react"
import CustomInput from "../CustomInput/CustomInput"
import CustomSelect from "../CustomSelect/CustomSelect"
import { ISelectType } from "@/pages/admin/matches/index.page"
import { IGetAllLeagueResponse, IGetAllTeamsResponse, ITeam } from "@/types/auth";
import { seasons } from "@/pages/admin/matches/index.page";


export interface IMatchTypes {
    set_date: (e: any) => void;
    set_home_team: (e: any) => void;
    set_league: (e: any) => void;
    leagues: IGetAllLeagueResponse;
    teams: IGetAllTeamsResponse;
    away_team: ISelectType;
    home_team: ISelectType;
    league: ISelectType;
    season: ISelectType;
    set_away_team: (e: any) => void;
    set_season: (e: any) => void;
    date: string;
}


const UpdateMatch = (
    {
        leagues, 
        teams, 
        set_home_team, 
        home_team, 
        set_away_team, 
        set_league, 
        set_date,
        set_season,
        away_team,
        league,
        season,
        date
    }: IMatchTypes) => {
       
    return(
        <Box>
              
               <CustomSelect
               mt="20px"
                      label='Home Team'
                      placeholder=''
                      selectOptions={teams.data.map((i) => ({
                        label: i.name,
                        value: i._id,
                      }))}
                      selectProps={{
                        value: home_team,
                        onChange: (e: ISelectType) => set_home_team(e)
                      }}
                    />
                <CustomSelect
               mt="20px"
                      label='Away Team'
                      placeholder=''
                      selectOptions={teams.data.map((i) => ({
                        label: i.name,
                        value: i._id,
                      }))}
                      selectProps={{
                        value: away_team,
                        onChange: (e: ISelectType) => set_away_team(e)
                      }}
                    />
                        <CustomSelect
                mt="20px"
                      label='League'
                      placeholder='Select League'
                      selectOptions={leagues.data.map((i) => ({
                        label: i.name,
                        value: i._id,
                      }))}
                      selectProps={{
                        value: league,
                        onChange: (e: ISelectType) => set_league(e)
                      }}
                    />
                      <CustomSelect
               mt="20px"
                      label="Season"
                      placeholder=''
                      selectOptions={seasons.map(i => ({value: i.value, label: i.label}))}
                      selectProps={{
                        value: season,
                        onChange: (e: ISelectType) => set_season(e)
                      }}
                    />
                  <CustomInput
                label="Date"
                placeholder='appearance'
                id='appearance'
                inputProps={{
                  value: date,
                  onChange: (e) => set_date(e.target.value),
                  type: "datetime-local",
                }}
                mt={6}
              />
        </Box>
    )
}

export default UpdateMatch