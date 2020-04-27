// Conway's Game of Life
// Originally written by Mike Davis
// taken from processingjs.org

int sx, sy; 
float density = 0.5; 
int[][][] world;

void setup() { 
   //size(100, 100);
   frameRate(12);
   sx = (int)(width/12);
   sy = (int)(height/8);
   world = new int[sx][sy][2]; 
   stroke(#00FF00); 
   
   // Set random cells to 'on' 
   for (int i = 0; i < sx * sy * density; i++) { 
      world[(int)random(sx)][(int)random(sy)][1] = 1; 
   } 
} 

void draw() { 
   background(0);
   scale(width/sx);
   // Drawing and update cycle 
   for (int x = 0; x < sx; x=x+1) { 
      for (int y = 0; y < sy; y=y+1) { 
         //if (world[x][y][1] == 1) 
         // Change recommended by The.Lucky.Mutt
         if ((world[x][y][1] == 1) || (world[x][y][1] == 0 && world[x][y][0] == 1)) { 
            world[x][y][0] = 1; 
            point(x, y); 
         } 
         if (world[x][y][1] == -1)  { 
            world[x][y][0] = 0; 
         } 
         world[x][y][1] = 0; 
      } 
   } 
   // Birth and death cycle 
   for (int x = 0; x < sx; x=x+1) { 
      for (int y = 0; y < sy; y=y+1) { 
         int count = neighbors(x, y); 
         if (count == 3 && world[x][y][0] == 0) { 
            world[x][y][1] = 1;            
         } 
         if ((count < 2 || count > 3) && world[x][y][0] == 1) {           
            world[x][y][1] = -1;            
         }          
      }       
   }  
} 

// Count the number of adjacent cells 'on' 

int neighbors(int x, int y) { 
   return world[(x + 1) % sx][y][0] +    
      world[x][(y + 1) % sy][0] + 
      world[(x + sx - 1) % sx][y][0] + 
      world[x][(y + sy - 1) % sy][0] + 
      world[(x + 1) % sx][(y + 1) % sy][0] +
      world[(x + sx - 1) % sx][(y + 1) % sy][0] + 
      world[(x + sx - 1) % sx][(y + sy - 1) % sy][0] + 
      world[(x + 1) % sx][(y + sy - 1) % sy][0]; 
}