const suma = require('./testing_suma'); 
import { WebhookClient } from 'discord.js';

//path del modul que vols emportarte


//la frase es un print simplement, si fas algu de les api fica algo tipo: "testing conexion with api" o similar
test('sumar 1 + 2 es igual a 3', () => {
// en expect li pases la funcio amb els arguments i en .toBe el output que esperes
  expect(suma(1, 2)).toBe(3);
});

test('discord send message', () => {
  const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

  const channel = 'https://discord.com/api/webhooks/1027527145632833616/vhyoMOqQiFaoeL3fuG012pX-UyhxuN7_f5XBILVike6YGcfvQ_2zYLHQki-R3H91uvMe';
  const message = 'jesting the testing';
  let res = "OK";
  console.log('sending message to channel');
  try {
    const webhookClient = new WebhookClient({ url: `"${channel}"` });
    const embed = new EmbedBuilder()
        .setTitle(message)
        .setColor(0x00FFFF);
    webhookClient.send({
        content: '',
        username: 'jest',
        embeds: [embed],
    });
  } catch (error) {
    res = "KO";
  }
  
  console.log(res);
  expect(res).toBe("OK");
});