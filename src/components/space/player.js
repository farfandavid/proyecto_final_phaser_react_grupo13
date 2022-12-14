import Phaser from "phaser";

var bullets;
var ship;
var lastFired = 0;
var isDown = false;
var mouseX = 0;
var mouseY = 0;

export class Player extends Phaser.GameObjects.Sprite {

    constructor() {
        super({key:'Player'});  
    }

    preload(){
        this.load.image('ship', 'assets/spaceInvader/sprites/Player.png');
        this.load.image('bullet1', 'assets/spaceInvader/sprites/Bala.png');
    }


    create (){
       
        var Bullet = new Phaser.Class({
            
            Extends: Phaser.GameObjects.Image,

            initialize:
            
            function Bullet (scene){
                Phaser.GameObjects.Image.call(this, scene, 0, 0,'bullet1');
                this.incX = 0;
                this.incY = 0;
                this.lifespan = 0;

                this.speed = Phaser.Math.GetSpeed(600, 1);
            },

            //Aqui se calculara el disparo.
            fire: function (x, y){
                this.setActive(true);
                this.setVisible(true);
                this.setPosition(400,300);

                var angle = Phaser.Math.Angle.Between(x, y, 400, 300);

                this.setRotation(angle);

                this.incX = Math.cos(angle);
                this.incY = Math.sin(angle);
                //El lifespan nos sirve para que nuestras balas salgan disparadas en cierto rango, si el rango es bajo desapareceran antes.
                this.lifespan = 500;
            },

            update: function (time, delta){

                this.lifespan -=delta;
                this.x -= this.incX * (this.speed * delta);
                this.y -= this.incY * (this.speed * delta);
    
                if (this.lifespan <= 0)
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
            } 

        });

    
        bullets = this.add.group({
            classType: Bullet,
            maxSize: 50,
            runChildUpdate: true
        });
        //Aqui aremos que el player se cree.
        ship = this.add.image(400, 300, 'player').setDepth(1);

        this.input.on('pointerdown', function (pointer){
            //Aqui definimos los valores de las variables.
            isDown = true;
            mouseX = pointer.x;
            mouseY = pointer.y;
            
        });

        //En esta parte haremos que nuestra nave gire con respecto al mouse.
        this.input.on('pointermove', function (pointer){

            mouseX = pointer.x;
            mouseY = pointer.y;

        });
        //Con esto definiremos un input para disparar y diremos que tenga un valor de "false" ya que si esta en "true" este creara infinitas balas despues de un clic.
        this.input.on('pointerup', function (pointer){

            isDown = false;

        });
    }

     update(time, delta) {
        {
            //Basicamente lo que vemos aqui es la creacion de las balas y esto comprobara si el clic fue presionado, en caso de ser correcto se creara una bala.
            if (isDown && time > lastFired)
            {
                var bullet = bullets.get();

                if (bullet)
                {
                    bullet.fire(mouseX, mouseY);
                    //El lastFired es el cooldown entre disparos (en otras palabras es una pausa entre disparos)
                    lastFired = time + 450;
                    
                }
            }
            //Aqui se definira la rotacion de nuestra nave dependiendo de donde apunte nuestro mouse.
             ship.setRotation(Phaser.Math.Angle.Between(mouseX, mouseY, ship.x, ship.y)- Math.PI / 2);
     }
    }
}
export default Player;