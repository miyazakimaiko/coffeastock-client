import { useMutation } from 'react-query'
import { useUserData } from '../context/AccountContext'
import toastOnBottomCenter from '../utils/customToast'
import * as api from '../api/Users'

export default function useAddUser() {
  const user = useUserData();

  // 28.1kb for 40 entries.
  //
  for (let i=0; i<40; i++) {
    body.origin_range.items[i] = {
      "def": "一般的には、 昔シーラ・グレアムはこう言いました、「ぜがひでも欲しいと思うものは何でも得られる。それには皮膚から噴き上げ、世界を創造したエネルギーと合流する、あふれんばかりの熱情でそれを望まなければならない。」こういう思考を持って、我々はこの問題をより慎重に考え直さねばならない： この方面から考えるなら、とりあえす、 昔徳川家康はこう言ったことがある、「いさめてくれる部下は、一番槍をする勇士より値打ちがある。」こうした中、私の疑問が解けました。昔ゲーテはこう言いました、「ここで今これ以上骨を折っても無駄だ！バラならば、花咲くだろう。」こうした中、私の疑問が解けました。花言葉はなんのことで発生したのか？花言葉はなんのことで発生したのか？一般論を述べると、問題のコツをマスターすれば、残りは全て刃を迎えて解くと思われます。 しかし、こうした件は全部が重要ではない。もっと重要なのは、 一般的には、 一般的には、 この方面から考えるなら、昔ジョシュア・リーブマンはこう言いました、「いつまで一緒にいられるか分からないということをしっかり心にとめてお互いを大切にしよう。」それによって私は啓発されました、 私本人もじっくり考えながら、夜となく昼となく花言葉のことを考えています。 昔マルティアリスはこう言ったことがある、「すべての日がそれぞれの贈り物をもっている。」思い返せば。 これらの疑問を持って、我々は花言葉を念入りに考えましょう。", 
      "inUse": 0, 
      "label": `テスト投稿。タイトルの長さはどれくらいまで長くても大丈夫か。タイトルに60文字は結構長い方だと思うけどどうだろう ${i}`, 
      "value": i
    }

  }
  return useMutation(
    async () => await api.addUser(user.sub, body, user.accessToken.jwtToken),
    {
      onSuccess: () => toastOnBottomCenter('success', 'Welcome to Coffee Journal!'),
      onError: error => toastOnBottomCenter('error', error.message)
    }
  )
}

const body = {
  "origin_range": {
    "nextId": 121,
    "items": {
    }
  },
  "farm_range": {
    "nextId": 1,
    "items": {
    }
  },
  "variety_range": {
    "nextId": 1,
    "items": {
    }
  },
  "process_range": {
    "nextId": 1,
    "items": {
    }
  },
  "roaster_range": {
    "nextId": 1,
    "items": {
    }
  },
  "method_range": {
    "nextId": 1,
      "items": {
    }
  },
  "water_range": {
    "nextId": 1,
    "items": {
    }
  },
  "grinder_range": {
    "nextId": 1,
    "items": {
    }
  },
  "palate_range": {
    "nextId": 1,
    "items": {
    }
  },
  "aroma_range": {
    "nextId": 1,
    "items": {
    }
  }
}