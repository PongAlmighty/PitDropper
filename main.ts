input.touchA5.onEvent(ButtonEvent.Down, function () {
    light.setAll(0xff00ff)
    if (input.switchRight()) {
        MenuLights = TimeToDrop * 1
    } else {
        MenuLights = TimeToDrop * 10
    }
    while (input.touchA5.isPressed()) {
        if (input.touchA3.isPressed()) {
            TimeToDrop = TimeToDrop + Increment
            MenuLights = MenuLights + 1
        } else if (input.touchA2.isPressed()) {
            TimeToDrop = TimeToDrop - Increment
            MenuLights = MenuLights - 1
        } else {
        	
        }
        while (TimeToDrop > TotalMatchTime) {
            TimeToDrop = TimeToDrop - Increment
            MenuLights = MenuLights - 1
        }
        while (TimeToDrop < Increment) {
            TimeToDrop = Increment
            MenuLights = 1
        }
        for (let TimerLight of PinOrder) {
            light.setAll(0xffff00)
            light.setPixelColor(MenuLights, 0xff00ff)
        }
    }
    Reset()
})
input.touchA4.onEvent(ButtonEvent.Down, function () {
    light.setAll(0x00ffff)
    if (input.switchRight()) {
        MenuLights = TotalMatchTime * 1
    } else {
        MenuLights = TotalMatchTime * 10
    }
    while (input.touchA4.isPressed()) {
        if (input.touchA3.isPressed()) {
            TotalMatchTime = TotalMatchTime + Increment
            MenuLights = MenuLights + 1
        } else if (input.touchA2.isPressed()) {
            TotalMatchTime = TotalMatchTime - Increment
            MenuLights = MenuLights - 1
        } else {
        	
        }
        if (MenuLights > 9) {
            TotalMatchTime = Increment * 9
            MenuLights = 9
        } else if (MenuLights < 1) {
            TotalMatchTime = Increment
            MenuLights = 1
        } else {
        	
        }
        for (let TimerLight of PinOrder) {
            light.setAll(0xffff00)
            light.setPixelColor(MenuLights, 0x00ffff)
        }
    }
    Reset()
})
function MessWithTime (TimeInms: number) {
    return TimeInms * (60 * 1000)
}
input.buttonA.onEvent(ButtonEvent.Click, function () {
    if (MatchOver == 0) {
        light.setAll(0x000000)
        control.timer2.reset()
        for (let TimerLight of PinOrder) {
            if (control.timer2.millis() <= TimeToDropMS) {
                light.setPixelColor(TimerLight, 0x00ff00)
            } else {
                light.setPixelColor(TimerLight, 0xff8000)
                if (WasWarningPlayed == 0) {
                    music.powerUp.playUntilDone()
                    WasWarningPlayed = 1
                    servos.A1.setAngle(180)
                }
            }
            control.waitMicros(TimeBetweenLights * 1000)
        }
        music.siren.play()
        MatchOver = 1
    } else {
        Reset()
    }
})
function Reset () {
    TotalMatchTimems = MessWithTime(TotalMatchTime)
    TimeToDropMS = MessWithTime(TimeToDrop)
    MatchOver = 0
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
}
let TotalMatchTimems = 0
let TimeBetweenLights = 0
let WasWarningPlayed = 0
let TimeToDropMS = 0
let MatchOver = 0
let PinOrder: number[] = []
let MenuLights = 0
let Increment = 0
let TimeToDrop = 0
let TotalMatchTime = 0
light.showAnimation(light.runningLightsAnimation, 2000)
if (input.switchRight()) {
    TotalMatchTime = 3
    TimeToDrop = 2
    Increment = 1
} else {
    TotalMatchTime = 0.2
    TimeToDrop = 0.1
    Increment = 0.1
}
Reset()
