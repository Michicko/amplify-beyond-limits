import { Box } from "@chakra-ui/react"
import CustomSelect from "../CustomSelect/CustomSelect"
import CustomButton from "../CustomButton/CustomButton";
import { IGetAllPlayerResponse } from "@/types/auth"
import { ISelectType } from "@/pages/admin/matches/index.page";
import { useCreateMatchLineUpMutation } from "@/store/api/match.api";

interface IStat {
    players: IGetAllPlayerResponse;
    set_players: (data: ISelectType[]) => void;
    selected_players: ISelectType[];
    team?: string;
    match?: string;
    onModalClose?: () => void;
}



const Stat = ({players, selected_players, set_players, team, match, onModalClose}: IStat) => {

    const [createlineUp, {isLoading, isError} ] = useCreateMatchLineUpMutation()

    const handleCreate = async() => {
        try {
           await createlineUp({
                stat: selected_players.map(i => ({team, match, player: i.value}))
            })
            await onModalClose()
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
         <CustomSelect
         isMulti
               mt="20px"
                      label='Players'
                      placeholder=''
                      selectOptions={players?.data.map((i) => ({
                        label: i?.first_name+" "+i?.last_name,
                        value: i._id,
                      }))}
                      selectProps={{
                      value: selected_players,
                      onChange: (e: ISelectType[]) => set_players(e)
         }}
            />
                 <CustomButton
                 mt={5}
                type='submit'
                isLoading={isLoading}
                isError={isError}
                w='100%'
                onClick={handleCreate}
              >
                Update
              </CustomButton>
            </>
    )
}

export default Stat