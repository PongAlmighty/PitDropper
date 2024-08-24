def on_touch_a5_down():
    global MenuLights, TimeToDrop
    light.set_all(0xff00ff)
    if input.switch_right():
        MenuLights = TimeToDrop * 1
    else:
        MenuLights = TimeToDrop * 10
    while input.touch_a5.is_pressed():
        if input.touch_a3.is_pressed():
            TimeToDrop = TimeToDrop + Increment
            MenuLights = MenuLights + 1
        elif input.touch_a2.is_pressed():
            TimeToDrop = TimeToDrop - Increment
            MenuLights = MenuLights - 1
        else:
            pass
        while TimeToDrop > TotalMatchTime:
            TimeToDrop = TimeToDrop - Increment
            MenuLights = MenuLights - 1
        while TimeToDrop < Increment:
            TimeToDrop = Increment
            MenuLights = 1
        for TimerLight in PinOrder:
            light.set_all(0xffff00)
            light.set_pixel_color(MenuLights, 0xff00ff)
    Reset()
input.touch_a5.on_event(ButtonEvent.DOWN, on_touch_a5_down)

def on_touch_a4_down():
    global MenuLights, TotalMatchTime
    light.set_all(0x00ffff)
    if input.switch_right():
        MenuLights = TotalMatchTime * 1
    else:
        MenuLights = TotalMatchTime * 10
    while input.touch_a4.is_pressed():
        if input.touch_a3.is_pressed():
            TotalMatchTime = TotalMatchTime + Increment
            MenuLights = MenuLights + 1
        elif input.touch_a2.is_pressed():
            TotalMatchTime = TotalMatchTime - Increment
            MenuLights = MenuLights - 1
        else:
            pass
        if MenuLights > 9:
            TotalMatchTime = Increment * 9
            MenuLights = 9
        elif MenuLights < 1:
            TotalMatchTime = Increment
            MenuLights = 1
        else:
            pass
        for TimerLight2 in PinOrder:
            light.set_all(0xffff00)
            light.set_pixel_color(MenuLights, 0x00ffff)
    Reset()
input.touch_a4.on_event(ButtonEvent.DOWN, on_touch_a4_down)

def MessWithTime(TimeInms: number):
    return TimeInms * (60 * 1000)

def on_button_a_click():
    global WasWarningPlayed, MatchOver
    if MatchOver == 0:
        light.set_all(0x000000)
        control.timer2.reset()
        for TimerLight3 in PinOrder:
            if control.timer2.millis() <= TimeToDropMS:
                light.set_pixel_color(TimerLight3, 0x00ff00)
            else:
                light.set_pixel_color(TimerLight3, 0xff8000)
                if WasWarningPlayed == 0:
                    music.power_up.play_until_done()
                    WasWarningPlayed = 1
                    servos.A1.set_angle(180)
            control.wait_micros(TimeBetweenLights * 1000)
        music.siren.play()
        MatchOver = 1
    else:
        Reset()
input.button_a.on_event(ButtonEvent.CLICK, on_button_a_click)

def Reset():
    global TotalMatchTimems, TimeToDropMS, MatchOver, PinOrder, TimeBetweenLights, WasWarningPlayed
    TotalMatchTimems = MessWithTime(TotalMatchTime)
    TimeToDropMS = MessWithTime(TimeToDrop)
    MatchOver = 0
    PinOrder = [4, 3, 2, 1, 0, 9, 8, 7, 6, 5]
    TimeBetweenLights = TotalMatchTimems / 9
    WasWarningPlayed = 0
    servos.A1.set_range(0, 180)
    servos.A1.set_angle(0)
    light.set_all(0x007fff)
TotalMatchTimems = 0
TimeBetweenLights = 0
WasWarningPlayed = 0
TimeToDropMS = 0
MatchOver = 0
PinOrder: List[number] = []
MenuLights = 0
Increment = 0
TimeToDrop = 0
TotalMatchTime = 0
light.show_animation(light.running_lights_animation, 2000)
if input.switch_right():
    TotalMatchTime = 3
    TimeToDrop = 2
    Increment = 1
else:
    TotalMatchTime = 0.2
    TimeToDrop = 0.1
    Increment = 0.1
Reset()