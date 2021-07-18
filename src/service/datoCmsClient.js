import { SiteClient} from 'datocms-client';

const client = new SiteClient('3d0c8dd380a93f11c3424fdac77156');

async function createCommunity(community) {
  console.log(community);
  await client.items.create({
    itemType: "977047",
    title: community.title,
    url: community.url,
    tumbler: community.tumbler,
  });
}

async function getAllCommunities() {
  const communities = await client.items.all({
    type: "community",
  });

  return communities
}

export const CommunityService = {
  getAllCommunities : getAllCommunities,
  createCommunity : createCommunity,
}
