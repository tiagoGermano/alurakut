import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/alurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import axios from 'axios';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';
import { CommunityService } from '../src/service/community';

function CommunityBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} (
        {props.communities ? props.communities.length : 0}
        )
      </h2>
      <ul>
        {props.communities?.slice(0,6).map((community) => (
          <li key={community.index}>
            <a href={community.url} key={community}>
              <img src={community.image} />
              <span>{community.title}</span>
            </a>

          </li>
        ))}
      </ul>
    </ProfileRelationsBoxWrapper>    
  )  
}

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`http://www.github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`} >
          @{props.githubUser}
        </a>
      </p>
      <hr />      

      <AlurakutProfileSidebarMenuDefault />
    </Box>

  );
}

export default function Home(props) {
  const favorites = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'emanuelalves',
    'felipefialho',
  ];
  const [githubUser, setGithubUser] = useState(props.githubUser)
  const [communities, setCommunities] = useState([]);
  const [followers, setFollowers] = useState([]);
  const nostalgicIconValues = {confiavel: 3, legal: 3, sexy:3};

  const loadCommunities = async () => {
    const savedCommunities = await CommunityService.getAllCommunities();
    const lstCommunities = savedCommunities.map((community) => {
      return {
        index: community.id,
        title: community.title,
        image: community.tumbler,
        url:   community.url
      }
    });

    setCommunities(lstCommunities);
  }

  const createCommunity = async (community) => {
    CommunityService.createCommunity(community, function(result){
      const created = {
        title: result.title,
        tumbler: result.tumbler,
        url: result.url,
      }
      setCommunities([...communities, created]);
    });
  }

  useEffect(async () => {
    const result = await axios(
      `https://api.github.com/users/${githubUser}/followers`,
    );
 
    loadCommunities();
    setFollowers(result.data);
  },[]);  

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
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
          <Box>
            <h2>O que você deseja fazer ?</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const communityIndex = communities.length;

              const community = {
                index: communityIndex,
                title: formData.get('title'),
                tumbler: formData.get('tumbler'),
                url:   formData.get('url'),
              }

              createCommunity(community);

            }}>

              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="URL para capa da comunidade"
                  name="tumbler"
                  aria-label="URL para capa da comunidade"
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Url da página da comunidade"
                  name="url"
                  aria-label="Url da página da comunidade"
                  type="text"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <CommunityBox title="Comunidades" communities={communities} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade (
              {favorites.length}
              )
            </h2>
            <ul>
              {favorites.map((itemAtual) => (
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`} >
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
              {followers.slice(0,6).map((follower, index) => (
                <li key={follower.id}>
                  <a href={`/users/${follower.login}`} >
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

export async function getServerSideProps(context) {
  const token = nookies.get(context).USER_TOKEN;
  const decodedToken = jwt.decode(token);

  return {
    props: {
      githubUser: decodedToken.githubUser,
    }
  }
}