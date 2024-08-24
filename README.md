# StyleSwapApi
<!-- actions --->
[![.github/workflows/main.yml](https://github.com/Fiversity-1/StyleSwapAPI/actions/workflows/main.yml/badge.svg)](https://github.com/Fiversity-1/StyleSwapAPI/actions/workflows/main.yml)

### What is Style Swap?
<!-- copy from app --->

### Documentation
[Online Documentation via Postman](https://documenter.getpostman.com/view/37269020/2sA3kaBdp1)

#### Adding tags to the database enums
To add a tag to a database enum see the file ```./api/src/enums.ts```, this will allow you to add tags to an existing enum, etc.

Obviously if you want to add a completely new enum for the clothing, this will need some code, but editing the ```./api/src/db/Clothing.ts``` and the ```./api/src/routes/clothing.ts``` to add the correct
code in there

#### Running
In order to run the code locally run ```./local.sh```

To kill the docker containers run ```./kill.sh```
NOTE THIS WILL KILL ALL DOCKER CONTAINERS RUNNING!!!

To get new keys and save them in .env run ```./keys.sh```

### Testing
Most of the tests are run through Postman, this allowed for quick and easy testing of the back-end API without having to add outside code and functions (the more code you have / write the worse it gets)



### An ASCII Cat
```
  ,-.       _,---._ __  / \
 /  )    .-'       `./ /   \
(  (   ,'            `/    /|
 \  `-"             \'\   / |
  `.              ,  \ \ /  |
   /`.          ,'-`----Y   |
  (            ;        |   '
  |  ,-.    ,-'         |  /
  |  | (   |        hjw | /
  )  |  \  `.___________|/
  `--'   `--'
```
