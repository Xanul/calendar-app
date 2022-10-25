import { useSelector } from "react-redux"

export const useUiStore = () => {

  const test = useSelector( state =>  state.ui )

  console.log(test);

}