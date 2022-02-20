import mqtt from 'mqtt'

const options = {
  connectTimeout: 40000,
  clientId: 'mqtitId-DEVICE',
  clean: true,
}
export const client = mqtt.connect('ws://39.105.106.13:8083/mqtt', options)
