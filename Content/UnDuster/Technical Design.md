## Goals

UnDuster is built on hand-crafted content, so my main goal with technical design for this project was to make the level creation process as frictionless as possible. 

Our level design was all-hands-on-deck for our 4 designers (including myself), so I was able to collect a wealth of feedback on the level design process and create a tight feedback loop for my tooling.

![](https://sites.google.com/u/0/sites-images-rt/AGugd502shLQmVPgZL5Igr7oGFPpCgZw8J0KihORHf1yYZApis1TWD2h3Xe3S1wHZ8lvHRS8Jyv0O1_A-bwdn8vA4O7pFn4opykaeu5WADrDDpsHUea2R51DXT7uEQafPmOwxKIdUlsnZbhdcRfdMJAm28BWnn9ONS3-FKfiD1rWzesiDFDqUdyBRAWJpihn=s2048)

![](https://sites.google.com/u/0/sites-images-rt/AGugd50BSeIw5Jf6cMeM_oGJU80FKjHr4Bts19zS2fu0qFdoM3kdfIpS3pwZ7GQnK5-k7eEJlSi3uxaKvCzBueH_g124OVbaKrVq2G-qXnOl59lBV8R9mymv6FAYkru_1dgDLaub3FJhYwBhYipk11Va966y221-s10W-ch1JdgLDpDiwf1heVKfMSPWG2j8twoVBQ=s2048)

## Level Structure

Pictured here is one of UnDuster's six levels. Each level consists of smaller rooms (pictured above), usually around 20. The order of these rooms is crucial for designing the game's difficulty curve, pacing, and general flow.

At first, our designers had to manually drag each room to line up its entrance and exit points. This worked for the game jam when each level had only a couple of rooms, but with the larger scale of the full game, it became extremely tedious.

So I created some tools to help!

## Room Snapping

I added a handle to the center of each room which could then use the room's defined exit points to snap to other rooms. I was able to achieve this behavior through Unity's custom editor handles. 

While working on this tool I learned of HandleUtility.GetHandleSize, which allows you to build scene editor functionality that takes the scene view's camera size into account. I used this to adjust the minimum snapping distance based on how zoomed in the user is. This keeps snapping consistent regardless of zoom instead of being either too aggressive when zoomed in, or not aggressive enough when zoomed out.

![](https://sites.google.com/u/0/sites-images-rt/AGugd53b4HNiNq0qJnTXoZJZ_329AvHkQhxE7hLxQmRr6-g48MXMI3Zv2atWCbyPNNd87QPdrBrDUEbl0GdDaWkAeFhMt_J4yQkCJkOocXECV2X8PdTBJTFFVY3WrcZPAnQEDduBTkwuzkb64rFdvXM8ewRDOxuWDyfk-t5c_FFj4lh5ZWA6ffPoSIt1JkgwePY=s2048)

![](https://sites.google.com/u/0/sites-images-rt/AGugd51lzb4incjf6qa7jfpaRNeGrGnwomgOXP3NYv1KzEm_f2JfznfSJ5QDkBPFisxbcG4mbzSghFwGNtLf6WoK9O0kazQc_6qKXxhC7hTnYCOsG1v0J2PTX5iZ7pblFZMO1zQ2AVMu2VaILb2khh7KSEerTIbqKStbg7tXr_MsOzTkfm3ek2I0tBxuf-GKUJ3-gg=s2048)

![](https://sites.google.com/u/0/sites-images-rt/AGugd53KDn_DENzFpTnfPZfe_TJJ0YLBGZDPHQfeka02ULwYctBrlxfv8sEK4RSCLY4xRevzRU6EpgAvn6_irkmhyAZzZ-jJa0LK_ISCLRLQAp1_C63VA8eoq_UyHMHeBBEbtGlVIJiTaAf3GXt_vZMU4Okd_uOCyYz2n3iXsnJ6ol6oz_CeeXLy67GU56ufhQQ=s2048)

## Room Sequencer

While room snapping is helpful for quickly reordering rooms without needing to painstakingly line them up, macro-level reordering was still an issue. As such, I created the room sequencer.

It's a component in the scene that hosts a list of rooms and can regenerate the entire level's room seqeunce with the click of a button ("Update Rooms", at the bottom of the component).

The room sequencer also supports branching room paths so we could have secret rooms that branch off the main room sequence.

Since the room sequencer now had knowledge of the first room of the level, I also added the functionality of spawning in our player prefab at correct starting position

Spawning in the player as a prefab let our designers move the player to different positions within the level for easily testing a certain section, while keeping it easy to reset the player to the starting position when necessry.

## Platforming Elements

UnDuster has a couple platforming elements that involve some amount of configuration when placed in the level.

I used Unity's gizmo to display relevant information  
for each one in the scene so designers can tell at a glance how a room will function when played.

![](https://sites.google.com/u/0/sites-images-rt/AGugd50Bxf9dRA6ioW32qLn_9vGPoMOa_PLE4r2Gls7srEZZe7GcPCbPvpP6mjX4y1Y6_QwQH_QqHMgNY0TXIr3OXJiF1-Mabo6xvW_JvTErVhmzGbafhngTT8Jc9le7N15jRqZtdog_3x4UybolpfH6wpVXloNjNSC1bvN1BRvldUxzKiHwZESDJo6lOwDjKGy8sw=s2048)

![](https://sites.google.com/u/0/sites-images-rt/AGugd51QHF2f7Pun1lmaZSPll52ktD0FCDpCd94AvhhxbxgwryTU3fIPjUNAZ_Akri2dQGbiigap1PGmyfYoKKkLqw-O8i3ovr6a8ibpTtJAXoxrBrCk2xPPfFuJ-DtKHFghQRmUkrsivjfrZFWyeTdW9DzcABg_2WSm05tmd6A7kOwhzuAebVNFvZc5jupFdLECRg=s2048)

![](https://sites.google.com/u/0/sites-images-rt/AGugd50-rjqLdoLzoO08M1-YLIVER4-gbB6AvvLHUnOSv474W5gtp_eZLFJMoL5pCOkfhXSsJ_WefyCkotuXp7Cn-LgaskVq0fq7UJ069idIjr3_myKR4PYGQN5bw3bor5FdTEU5B9R4S7NKEnp_jPyZSNrJhniTTj8uk-WxT8CFhcIgeJHc4JcPLJBGxe8C_fmw_Q=s2048)

![](https://sites.google.com/u/0/sites-images-rt/AGugd52DUHA516an0nuyikZWTM32vD_EF7-eXbMBxdrJ0-vYApWKPBfswI60n_rE1vnWy-QCBMVDFWmNlRmC6kWR6XZMY368ch4thfgJEuJNKnQSd75qf1qkTyDJnUpt79PfYMipzTNKMY2JSjeYWXRDsHhkeO_JUHoTLkG9-td0X8ayb9wvVp-7pMEaJcNA4gACvA=s2048)

I also automated as much of the configuration process as possible. This is especially notable for the fan/door mechanic.

Originally, designers had to place a door prefab into the scene, then bring in each of the fan and light indicator prefabs they wanted connected to the door, then connect each fan and it's accompanying light to the door by dragging a reference to the fan onto the door.

I created tooling so designers could simply click a "create new fan" button on the door prefab to spawn in a new fan which was automatically connected.

## Scene Management

Even with just a few levels, a main menu, and level select, it became a bit tedious to manage the game's scene list.

After investigating Unity's API for the Build Settings, I created a handy content manager tool that completely automates the scene list by pulling the scene assets from our Level Info scriptable objects.

![](https://sites.google.com/u/0/sites-images-rt/AGugd51kQLqIj45sjvjZxaeyZPvroNJwsDkrNEE3dgpPbOcP7uiktZ-N3Om9J01CHA_CKPOEnP3rHYOIrjeXXzOz08eiJq2E7u9kNUuYAetV06z9NUtn_lFUDGDEF_o5UFJ_WZyMhZg48fUnlw7moKF2wmAB33mieCeManLgfpZRgbZVTf_wbdSB0Z9ktXBBuSdhfw=s2048)

![](https://sites.google.com/u/0/sites-images-rt/AGugd53Wwocz-EDPRexHkU41-h7NRg3hN78cXI6mIxXzJxFLO3PDvVG_PxbQX3iOyesgBZPEvnkJ34BfuNp0hm_VZ9ADmSdnYkBniHL0PjvAJQugCUZneJnvIXNzRNq5V8Vn9i64ytEtBfvHVbOR2ejDqRNHarvQkS-I7nuf4nk7bYnmxPcn4Eu-_zuGwxyg-Ec=s2048)

![](https://sites.google.com/u/0/sites-images-rt/AGugd51rlIQlzuaniCSRuaMSNnKgIZpyN2lV1QoMo2RqgIseHPjZ6WLv4QVUKBOYp-0HyVvexJQaaXtgk9Dmh2zjEkQ37LveJY--z7lRdqkxP3mofW0czs2gXYgKlZjs9ads_iS-9Jt0h2puhGLyCV-CJa5XmT_absjhgR_sUHMF2VzGVaSsi-ujNYW147_1C0htSQ=s2048)

![](https://sites.google.com/u/0/sites-images-rt/AGugd52z1hDJ9fhegWzxBHUo54UAIAxRabnQl4H_gSfEuqw84zRqDlhqGKE1Zujr87vpNCBvGKHqMzgi4ADUM6CbkY-TbskZSCEa_BWgH72JCSFyB0Y-48VkNR9PkMqB65OmiBnzMG86xD7Etqr6ydYSuyt_EGPRTozykPo7oDjF6qUFch9sZPPz6ZSp2hi155ys2A=s2048)

## Procedural Settings

I wanted accessibility and customization of the user experience to be low-cost to implement, and so I designed a system for modular settings.

Each setting is stored in Unity's PlayerPrefs system, but is represented in the application by a scriptable object that uses its name as key, stores a default value, and provides a runtime and editor getter/setter wrapper for the PlayerPref value.

These are extremely helpful, as working with Unity's PlayerPref system can be a black box, and this completely exposes its entire functionality in an intuitive and modular way.

The source code for the Setting scriptable object is [public on my github](https://github.com/Brevillo/Oliver-Unity-Utilities/blob/main/Runtime/Settings/Setting.cs).

![[Pasted image 20260916144012.png|700]]