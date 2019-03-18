const Player = require('../models/player.js');

module.exports = {
  createPlayer: async function({ playerInput }, req) {
    const existingPlayer = await Player.findOne({ name: playerInput.name });
    if(existingPlayer) {
      const error = new Error('Player already exists');
      throw error;
    }
    const player = new Player({
      name: playerInput.name,
      wins: playerInput.wins,
      losses: playerInput.losses,
      race: playerInput.race
    });
    const createdPlayer = await player.save();
    return { ...createdPlayer._doc, _id: createdPlayer._id.toString() };
  },

  readPlayer: async function({ _id }, req) {
    const player = await Player.findById(_id);
    if(!player) {
      const error = new Error('Player not found.');
      throw error;
    }
    return {
      ...player._doc,
      _id: player._id.toString()
    }
  },

  deletePlayer: async function({ _id }, req) {
    const player = await Player.findByIdAndDelete(_id);
    if(!player) {
      const error = new Error('Player deletion failed.');
      throw error;
    }
    return true;
  },
  
  updatePlayer: async function({ _id, playerInput }, req) {
    const player = await Player.findById(_id);
    if(!player) {
      const error = new Error('Player not found.');
      throw error;
    }
    player.name = playerInput.name;
    player.wins = playerInput.wins;
    player.losses = playerInput.losses;
    player.race = playerInput.race;
    const updatedPlayer = await player.save();
    if(!updatedPlayer) {
      const error = new Error('Player update failed.');
      throw error;
    }
    return {
      ...updatedPlayer._doc,
      _id: updatedPlayer._id.toString()
    };
  }
};