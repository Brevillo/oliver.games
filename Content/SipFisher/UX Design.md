My process for user experience design and UI throughout the game.

# Project Goals

Our primary goal for this project was to create broad appeal within the genres of cozy games, incremental games, and fishing games. These genres all have a precedent for simple and intuitive control schemes. As I went through the project, I developed some guiding principals:

- Keep the number of inputs to an absolute minimum.
- All non first-person gameplay should be completely controllable with the mouse and on-screen interfaces.

I didn't necessarily have these ideas established at the start of the project, so I had to learn how to advocate for these UX pillars to the rest of the team throughout the project.

# Personal Takeaways for UX

This was a really big project for me as a UX designer, so I wanted to look back at my work as whole and gather together some of the lessons I learned.

## Build shared interface with intentionality

I assembled the interaction system and various menus very iteratively throughout the project, but looking back it's very clear how they are all related and represent the same system to the player.

Specifically, all the interactables open some kind of interaction or sub menu, and I eventually realized it would be good to give every menu a visual "close" button. This is something I realized near the end of the project and tried to backfill, which left things slightly inconsistent across the various interactions.

Knowing now that this kind of pattern can emerge, going forward I will always be looking for common threads so I can build a generic system and UX language early on. This helps bring solutions I find for one interface to all similar interfaces, saving a ton of time and bringing a higher level of consistency across the game.

## Always look to add motion to interfaces

The joy of video games is right there in the name - video. Movement is the a huge part of the appeal, and I wish this is was something I had realized sooner in the project. By the end of the project I was able to get some amount of motion into almost every menu, and the few that don't really stand out as low quality and static (such as the main menu, and aspects of fishing and dock building).

I think my understanding of where to add motion evolved greatly on this project. For example, the menus that take place in 3D world space (the shop, fish return and trade, fishing, dock building, etc.), simply giving the camera a little tilt based on the player's mouse position added so much life to those interactions by emphasizing the 3-dimensionality.

For future projects, I try to design motion into the interface from the very start of the design process.

## Fighting for simplification is worth it

There were many times on this project where the design team wanted to add a feature which we all agreed would be a great addition. The sneaky issue that immediately follows is figuring out how the new feature fits into the game's interfaces. When confronted with this challenge, there is usually an easy answer - add another input to the control scheme, add another button to the menu. However, I've found that there is also usually a more difficult answer that can better preserve the simplicity of the interface.

For example,