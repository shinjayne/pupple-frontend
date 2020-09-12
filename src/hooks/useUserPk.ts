import {useApi} from "../ApiProvider";
import {useEffect, useState} from "react";

interface PkResponse {
  pk: number,
}

const useUserPk : () => number  | undefined = () => {
  const api = useApi()

  const [userPk, setUserPk] = useState<number>();
  useEffect(() => {
    call()

    async function call() {
      try {
        const {data} = await  api.get<PkResponse>('/accounts/ip')
        setUserPk(data.pk)
      }catch (e) {
        console.log(e)
      }

    }

  }, [api]);

  return userPk
}




export default useUserPk
