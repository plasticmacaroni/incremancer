Spells = {
  spells : [
    {
      id : 1,
      name : "Time Warp",
      tooltip : "Speed up the flow of time for 30 seconds",
      icon : "",
      cooldown : 120,
      duration : 30,
      energyCost : 0,
      override : false,
      start() {
        GameModel.gameSpeed = 2;
      },
      end() {
        GameModel.gameSpeed = 1;
      }
    },
    {
      id : 2,
      name : "Energy Charge",
      tooltip : "5x Energy rate for 20 seconds, cost 50 energy",
      icon : "",
      cooldown : 180,
      duration : 20,
      energyCost : 50,
      override : false,
      start() {
        GameModel.energySpellMultiplier = 5;
      },
      end() {
        GameModel.energySpellMultiplier = 1;
      }
    },
    {
      id : 3,
      name : "Detonate",
      tooltip : "Explode your zombies into clouds of plague, cost 69 energy... nice",
      icon : "",
      cooldown : 120,
      duration : 3,
      energyCost : 69,
      override : false,
      start() {
        Zombies.detonate = true;
      },
      end() {
        Zombies.detonate = false;
      }
    },
    {
      id : 4,
      name : "Earth Freeze",
      tooltip : "Freeze all humans in place preventing them from moving for 15 seconds, cost 75 energy",
      icon : "",
      cooldown : 60,
      duration : 15,
      energyCost : 75,
      override : false,
      start() {
        Humans.frozen = true;
      },
      end() {
        Humans.frozen = false;
      }
    },
    {
      id : 5,
      name : "Gigazombies",
      tooltip : "For 5 seconds any zombies spawned will be giants with 10x health and attack damage, cost 100 energy",
      icon : "",
      cooldown : 360,
      duration : 5,
      energyCost : 100,
      override : false,
      start() {
        Zombies.super = true;
      },
      end() {
        Zombies.super = false;
      }
    }, 
    {
      id : 6,
      name : "Advanced Time Warp",
      tooltip : "Speed up the flow of time for as long as you are able",
      icon : "",
      cooldown : 0,
      duration : 1,
      energyCost : 1,
      override: true,
      start() {
        let speedFactor = Math.ceil(GameModel.energy/10);
        this.onCooldown = true;
        this.cooldownLeft = speedFactor * 20;
        this.active = true;
        this.timer = this.cooldownLeft;
        GameModel.energy -= speedFactor * 10;
        speedFactor = (speedFactor > 7) ? 7 : speedFactor;
        GameModel.gameSpeed = (speedFactor > 7) ? 7 : speedFactor;
        GameModel.sendMessage("Speed boosted by " + ((speedFactor <= 1) ? ("nothing...") : (speedFactor + "!")));
        if (GameModel.energy < 0) {
          GameModel.energy = 0;
        }
      },
      end() {
        GameModel.gameSpeed = 1;
      }
    }
  ],
  lockAllSpells() {
    for (var i = 0; i < this.spells.length; i++) {
      this.spells[i].unlocked = false;
    }
  },
  unlockSpell(spellId) {
    for (var i = 0; i < this.spells.length; i++) {
      if (spellId == this.spells[i].id) {
        this.spells[i].unlocked = true;
      }
    }
  },
  getSpell(spellId) {
    for (var i = 0; i < this.spells.length; i++) {
      if (spellId == this.spells[i].id) {
        return this.spells[i];
      }
    }
  },
  getUnlockedSpells() {
    return this.spells.filter(spell => spell.unlocked);
  },
  castSpell(spell) {
    if (spell.onCooldown || spell.active || !spell.unlocked)
      return false;

    if (spell.energyCost > GameModel.energy)
      return false;
    
    if (spell.override != true) {
      GameModel.energy -= spell.energyCost;
      spell.onCooldown = true;
      spell.cooldownLeft = spell.cooldown;
      spell.active = true;
      spell.timer = spell.duration;
      GameModel.sendMessage(spell.name);
    }
    spell.start();
  },
  updateSpells(timeDiff) {
    for (var i = 0; i < this.spells.length; i++) {
      var spell = this.spells[i];

      if (spell.onCooldown) {
        spell.cooldownLeft -= timeDiff;
        if (spell.cooldownLeft <= 0) {
          spell.onCooldown = false;
        }
      }

      if (spell.active) {
        spell.timer -= timeDiff;
        if (spell.timer <= 0) {
          spell.active = false;
          spell.end();
        }
      }
    }
  }
};

for (var i = 0; i < Spells.spells.length; i++) {
  Spells.spells[i].onCooldown = false;
  Spells.spells[i].active = false;
  Spells.spells[i].cooldownLeft = 0;
  Spells.spells[i].timer = 0;
}