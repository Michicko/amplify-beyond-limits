import { Box, VStack, Text, HStack, Button } from "@chakra-ui/react"
import { useState } from "react";
import CustomSelect from "../CustomSelect/CustomSelect"
import CustomInput from "../CustomInput/CustomInput";
import { IGetAllPlayerResponse, IPlayer, ITeam } from "@/types/auth"
import { ISelectType } from "@/pages/admin/matches/index.page";
import { useCreateMatchLineUpMutation, useCreateMatchGoalMutation } from "@/store/api/match.api";
import CustomButton from "../CustomButton/CustomButton";
import { IGoal } from "@/types/auth";


interface IGoalProps {
    goals: IGoal[];
    players: IGetAllPlayerResponse;
    teams: ISelectType[];
    onModalClose: () => void;
    match: string;
}



const Goal = ({teams, goals, players, onModalClose, match}: IGoalProps) => {

    const [createGoal, {isLoading, isError} ] = useCreateMatchGoalMutation()
    const [showAddGoal, setShowAddGoal] = useState(false)
    const [player, set_player] = useState<ISelectType>({value: "", label: "", name: true})
    const [opposite_player, set_opposite_player] = useState("")
    const [time, set_time] = useState("")
    const [team, set_team] = useState<ISelectType>({value: "", label: ""})
    const [type, set_type] = useState<ISelectType>({value: "", label: ""})

    const handleCreate = async() => {
           try {

           await createGoal({
                player: player.value,
                opposite_player,
                time,
                team: team.value,
                type: type.value,
                match
            })
            await onModalClose()
        } catch (error) {
        }
    }

    return(
       <Box>
            <VStack width="full" alignItems="flex-end">
                 <Button onClick={() => setShowAddGoal(true)}>Add a goal</Button>
               </VStack>
        {
            showAddGoal ? 
            <Box mb={5}>
                <CustomSelect
               mt="20px"
                      label="Team"
                      placeholder=''
                      selectOptions={teams.map(i => ({value: i.value, label: i.label, name: i.name}))}
                      selectProps={{
                        value: team,
                        onChange: (e: ISelectType) => set_team(e)
                      }}
                    />
                {team?.value && team?.name ? 
                <CustomSelect
                      mt="20px"
                      label='Player'
                      placeholder=''
                      selectOptions={players?.data.map((i) => ({
                        label: i?.first_name+" "+i?.last_name,
                        value: i._id,
                      }))}
                      selectProps={{
                      value: player,
                      onChange: (e: ISelectType) => set_player(e)
                        }}
                    />: null
                            }
                  {team?.value && !team?.name ? 
                    <CustomInput
                        id=""
                        mt="20px"
                        label='Player'
                        placeholder=''
                        inputProps={{
                            onChange: e => set_opposite_player(e.target.value),
                            value: opposite_player
                        }}

                     />: null}
                    {team?.value ? 
                    <CustomInput
                        id=""
                        mt="20px"
                        label='Time'
                        placeholder=''
                        inputProps={{
                            value: time,
                            onChange: e => set_time(e.target.value),
                            type: "number"
                        }}

                     />: null}
                       {team?.value ? 
                    <CustomSelect
                      mt="20px"
                      label='Type of Goal'
                      placeholder=''
                      selectOptions={[
                        {
                        label: "Normal Goal",
                        value: "normal_goal"
                        },
                        {
                        label: "Penalty",
                        value: "penalty"
                        },
                    ]}
                      selectProps={{
                      value: type,
                      onChange: (e: ISelectType) => set_type(e)
                        }}
                    />: null}
                 </Box> : null
                }
            {goals.length > 0 ?
             <VStack width="full" alignItems="flex-start">
           
                {goals.map(i => (
               
                    <HStack spacing={2} bg="gray" w="full" height={20} px={4}>
                        <Text>{i?.player ? i?.player?.first_name : i?.opposite_player ? i?.opposite_player : ""}</Text>
                        <Text>'{i.time}{i.type === "penalty" ? "(P)" : null}</Text>
                    </HStack>
            
            ))}</VStack>
            : (!showAddGoal && <VStack justifyContent="center">
                <Text textAlign="center">No goal has been added for this match</Text><br/>
                <CustomButton onClick={() => setShowAddGoal(true)}>Add a goal</CustomButton>
            </VStack>)
        }
          <CustomButton
                isDisabled={(!player?.value && !opposite_player) || !time || !team?.value || !type?.value}
                 mt={5}
                type='submit'
                isLoading={isLoading}
                isError={isError}
                w='100%'
                onClick={handleCreate}
              >
                Update
              </CustomButton>
       </Box>
    )
}

export default Goal