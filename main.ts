function MessWithTime (TimeInms: number) {
    return TimeInms * (60 * 1000)
}
input.buttonA.onEvent(ButtonEvent.Click, function () {
    light.setAll(0x000000)
    control.timer2.reset()
    for (let TimerLight of PinOrder) {
        if (control.timer2.millis() <= TimeToDropMS) {
            light.setPixelColor(TimerLight, 0x00ff00)
        } else {
            light.setPixelColor(TimerLight, 0xff8000)
            if (WasWarningPlayed == 0) {
                music.powerUp.play()
                WasWarningPlayed = 1
                servos.A1.setAngle(180)
            }
        }
        control.waitMicros(TimeBetweenLights * 1000)
    }
    music.siren.play()
})
let WasWarningPlayed = 0
let TimeBetweenLights = 0
let PinOrder: number[] = []
let TimeToDropMS = 0
light.showAnimation(light.runningLightsAnimation, 2000)
let TotalMatchTime = 0.5
let TotalMatchTimems = MessWithTime(TotalMatchTime)
let TimeToDrop = 0.3
TimeToDropMS = MessWithTime(TimeToDrop)
PinOrder = [
4,
3,
2,
1,
0,
9,
8,
7,
6,
5
]
TimeBetweenLights = TotalMatchTimems / 9
WasWarningPlayed = 0
servos.A1.setRange(0, 180)
servos.A1.setAngle(0)
light.setAll(0x007fff)
