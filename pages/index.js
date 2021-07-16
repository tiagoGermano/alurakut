import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/alurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ProfileSidebar(prop) {
  return (
    <Box>
      <img src={`http://www.github.com/${prop.githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  );
}

export default function Home() {
  const githubUser = 'tiagoGermano';
  const favorits = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'emanuelalves',
    'felipefialho',
  ];
  const [followers, setFollowers] = useState([]);
  const nostalgicIconValues = {confiavel: 3, legal: 3, sexy:3};

  useEffect(async () => {
    const result = await axios(
      'https://api.github.com/users/tiagoGermano/followers',
    );
 
    setFollowers(result.data);
  });  

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet confiavel={nostalgicIconValues.confiavel} legal={nostalgicIconValues.legal} sexy={nostalgicIconValues.sexy} />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade (
              {favorits.length}
              )
            </h2>
            <ul>
              {favorits.map((itemAtual) => (
                <li>
                  <a href={`/users/${itemAtual}`} key={itemAtual}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>

                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Seguidores (
              {followers.length}
              )
            </h2>
            <ul>
              {followers.slice(0,6).map((follower) => (
                <li>
                  <a href={`/users/${follower.login}`} key={follower.id}>
                    <img src={`https://github.com/${follower.login}.png`} />
                    <span>{follower.login}</span>
                  </a>

                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>          
        </div>
      </MainGrid>
    </>
  );
}
