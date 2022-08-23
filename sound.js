function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.volume = 1;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.sound.loop = false;

  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  }
  this.stop = function() {
    this.sound.pause();
    this.sound.currentTime = 0
  }
  this.volume = function(vol) {
    this.sound.volume = vol;
  }
}

class SoundPlayer {
  constructor() {
    this.doorSound = new sound("./assets/sounds/door.mp3");
    this.theme = new sound("./assets/sounds/main_theme.mp3");
    this.knifeSound = new sound("./assets/sounds/knife2.mp3");
    this.pistolSound = new sound("./assets/sounds/pistol.mp3");
    this.machineGunSound = new sound("./assets/sounds/machineGun.mp3");
    this.gatlingGunSound = new sound("./assets/sounds/gatling.mp3");

    this.painSound = new sound("/assets/sounds/nme_pain2.mp3");
    this.dogHitSound = new sound("/assets/sounds/dog_hit.mp3");

    this.achtungSound = new sound("/assets/sounds/achtung.mp3");
    this.alarmSound = new sound("/assets/sounds/guard_alarm.mp3");
    this.spionSound = new sound("/assets/sounds/spia.mp3");
    this.barkingSound = new sound("/assets/sounds/dog_barking.mp3");

    this.enemyShootingSound = new sound("/assets/sounds/enemy_shooting2.mp3");
    this.dogBittingSound = new sound("/assets/sounds/dog_barking_2.mp3");

    this.mummySound = new sound("/assets/sounds/death_mami.mp3");
    this.lebenSound = new sound("/assets/sounds/death_mein_leben.mp3");
    this.dyingDogSound = new sound("./assets/sounds/dog_death.mp3");
  }
  mainTheme() {
    this.theme.play();
  }
  door() {
    this.doorSound.play();
  }
  knife() {
    this.knifeSound.play();
  }
  pistol() {
    this.pistolSound.play();
  }
  machineGun() {
    this.machineGunSound.play();
  }
  gatlingGun() {
    this.gatlingGunSound.play();
  }
  nmePain() {
    this.painSound.play();
  }
  stopPain() {
    this.painSound.stop();
  }
  achtung() {
    this.achtungSound.play();
  }
  alarm() {
    this.alarmSound.play();
  }
  spy() {
    this.spionSound.play();
  }
  nmeShoot() {
    this.enemyShootingSound.play();
  }
  stopNmeShoot() {
    this.enemyShootingSound.stop();
  }
  mom(){
    this.mummySound.play();
  }
  leben(){
    this.lebenSound.play();
  }
  bark() {
    this.barkingSound.play();
  }
  bite() {
    this.dogBittingSound.play();
  }
  stopBite() {
    this.dogBittingSound.stop();
  }
  dogHit() {
    this.dogHitSound.play();
  }
  dogRip() {
    this.dyingDogSound.play();
  }
}

export { SoundPlayer };
