---
layout: post
title: Force of Resistance and its Effect on the Acceleration, Velocity, & Position Functions in Two & Three Dimensions
excerpt_separator: <!--more-->
---
<div style="display:none">
	$$
	\DeclareMathOperator{\arctanh}{arctanh}
	\DeclareMathOperator{\sech}{sech}

	\newcommand{\differtiate}[2]{\: \dfrac{\strut\mathrm{d}}{\strut\mathrm{d{#2}}}{\left(#1\right)}}
	\newcommand{\differtial}[1]{\: \mathrm{d}{#1}}
	\newcommand{\vect}[1]{\boldsymbol{#1}}
	$$
</div>
# Introduction
It can be noted that the acceleration of an object is the sum of all the forces acting upon it by Newton's Second Law. 

$$ \vect{F}_{Net} = \Sigma\vect{F} = m\vect{a(t)} = m\differtiate{\vect{v(t)}}{t} $$

Notice that we can write this equation in either with velocity and position as well.

$$ \Sigma\vect{F} = m\vect{a(t)} = m\differtiate{\vect{v(t)}}{t} = m\: \dfrac{\mathrm{d}^2}{\mathrm{dt^2}}{(\vect{s(t)})} $$

The key here is to notice that acceleration is the derivative of velocity and position is the integral of velocity with respect to time.

We can split this net force into components in the x and y coordinates and by extension, the z coordinates.

$$ \begin{align}
    \Sigma\vect{F} &= \overbrace{\begin{pmatrix} \Sigma F_x \\ \Sigma F_y \end{pmatrix}}^{\mathbb{R}^2} &
    \Sigma\vect{F} &= \overbrace{\begin{pmatrix} \Sigma F_x \\ \Sigma F_y \\ \Sigma F_z \end{pmatrix}}^{\mathbb{R}^3}    
\end{align} $$

Of course, all these are defined for time greater than 0.
<!--more-->

# No Resistance
In the horizontal x-direction, no force due to gravity is exerted on the object and no other force is present but in the vertical y-direction, there is.

$$ \begin{align}
    \begin{pmatrix} F_x \\ F_y \end{pmatrix} &= \begin{pmatrix} 0 \\ F_g \end{pmatrix} 
    & \mathrm{where} \; F_g &= -mg \\ %
    \begin{pmatrix} m\differtiate{v_x(t)}{t} \\[0.3em] m\differtiate{v_y(t)}{t} \end{pmatrix} &= \begin{pmatrix} 0 \\ -mg \end{pmatrix} &
\end{align} $$

## Horizontal Direction
Solving in the x-direction results in:

$$ \begin{align}
    m\differtiate{v_x}{t} &= 0 & v_x(0) &= v_{xo} \\
    \int m \: \differtial{v_x(t)} &= 0 \\
    mv_x + C &= 0 & v_x(0) = v_{xo} &\implies C = -mv_{xo} \\
    mv_x - mv_{xo} &= 0
\end{align} $$

$$ \boxed{\therefore v_x(t) = v_{xo}} $$

This means the velocity function is constant and is independent of time in the x-direction as well as the mass of the object. From here, we can find the acceleration and position functions easily from here. 

$$ \begin{align}
    a_x(t) &= \differtiate{v_x(t)}{t} \\
    &= \differtiate{v_{xo}}{t}
\end{align} $$

$$ \boxed{\therefore a_x(t) = 0} $$

$$ \begin{align}
    x(t) &= \int v_x(t) & x(0) &= x_o \\
    &= \int v_{xo} \differtial{t} \\
    &= v_{xo}t + C & x(0) = x_o &\implies C = x_o
\end{align} $$

$$ \boxed{\therefore x(t) = v_{xo}t + x_o} $$

## Vertical Direction
Solving in the y-direction results in:

$$ \begin{align}
    m\differtiate{v_y(t)}{t} &= -mg & v_y(0) &= v_{yo} \\
    \int m \differtial{v_y} &= \int -mg \differtial{t} \\
    mv_y &= -mgt + C & v_y(0) = v_{yo} &\implies C = mv_{yo} \\
    mv_y &= -mgt + mv_{yo}
\end{align} $$

$$ \boxed{\therefore v_y(t) = -gt + v_{yo}} $$

We can find the acceleration and position function now.

$$ \begin{align}
    a_y(t) &= \differtiate{v_y(t)}{t} \\
    &= \differtiate{-gt + v_{yo}}{t}
\end{align} $$

$$ \boxed{\therefore a_y(t) = -g} $$

$$ \begin{align}
    y(t) &= \int v_x(t) & y(0) &= y_o \\
    &= \int \left(-gt + v_{yo}\right) \differtial{t} \\
    &= -\dfrac{1}{2}gt^2 + v_{yo}t + C & y(0) = y_o &\implies C = y_o
\end{align} $$

$$ \boxed{\therefore y(t) = -\dfrac{1}{2}gt^2 + v_{yo}t + y_o} $$

## Summary
Overall, we have our functions for acceleration, velocity, and position.

$$ \begin{align}
    \vect{a(t)} &= \begin{pmatrix} 0 \\ -g \end{pmatrix} \\
    \vect{v(t)} &= \begin{pmatrix} v_{xo} \\ -gt + v_{yo} \end{pmatrix} \\
    \vect{s(t)} &= \begin{pmatrix} v_{xo}t + x_o \\ -\dfrac{1}{2}gt^2 + v_{yo}t + y_o \end{pmatrix}
\end{align} $$

Take notice how all of these functions are independent of the mass of the object.
In three dimensions, the x and y functions are the same as the x function in two dimensions and the z function is the same as the y function.

$$ \begin{align}
    \vect{a(t)} &= \begin{pmatrix} 0 \\ 0 \\ -g \end{pmatrix} \\
    \vect{v(t)} &= \begin{pmatrix} v_{xo} \\ v_{yo}\\ -gt + v_{zo} \end{pmatrix} \\
    \vect{s(t)} &= \begin{pmatrix} v_{xo}t + x_o \\ v_{yo}t + y_o\\ -\dfrac{1}{2}gt^2 + v_{zo}t + z_o \end{pmatrix}
\end{align} $$

It is possible to rotated the xy plane such that xz plane is the only plane that contains motion. This enables to just use the two-dimensional version.

# Resistance Proportional to Velocity
\section{Resistance Proportional to Velocity} %
A force of resistance is exerted on the object opposite of the velocity. This means in any direction, this force exists. In this situation, the force is directly proportional to velocity $F_R \propto \vect{v}$.
\begin{align}
    \begin{pmatrix} F_x \\ F_y \end{pmatrix} &= \begin{pmatrix} F_R \\ F_g + F_R \end{pmatrix} 
    & \mathrm{where} \;  \begin{matrix} F_g = -mg \\ F_R = -kv \end{matrix}\\ %
    \begin{pmatrix} m\differtiate{v_x(t)}{t} \\[0.3em] m\differtiate{v_y(t)}{t} \end{pmatrix} &= \begin{pmatrix} -kv \\ -mg - kv \end{pmatrix} &
\end{align}
%
% Horizontal Direction
\subsection{Horizontal Direction} %
Solving in the x-direction results in:
\begin{align*}
    m\differtiate{v_x}{t} &= -kv_x & v_x(0) &= v_{xo} \\
    \int \dfrac{\differtial{v_x}}{v_x} &= \int -\dfrac{k}{m} \differtial{t}\\
    \ln|v_x| &= -\dfrac{k}{m}t + C & v_x(0) = v_{xo} &\implies C = \ln|v_{xo}| \\
    \ln|v_x| &= -\dfrac{k}{m}t + \ln|v_{xo}|
\end{align*}
%
\begin{equation}
    \Aboxed{\therefore v_x(t) &= v_{xo}e^{-\tfrac{k}{m}t}}
\end{equation}
%
We can find the acceleration and position function now.
\begin{align*}
    a_x(t) &= \differtiate{v_x(t)}{t} \\
    &= \differtiate{v_{xo}e^{-\tfrac{k}{m}t}}{t}
\end{align*}
%
\begin{equation}
    \boxed{\therefore a_x(t) = -\frac{k}{m}v_{xo}e^{-\tfrac{k}{m}t}}
\end{equation}
%
\begin{align*}
    x(t) &= \int v_x(t) & x(0) &= x_o \\
    &= \int v_{xo}e^{-\tfrac{k}{m}t} \differtial{t} \\
    &=-\frac{m}{k} v_{xo}e^{-\tfrac{k}{m}t} + C & x(0) = x_o &\implies C = x_o + \frac{m}{k}v_{xo} \\
    &= -\frac{m}{k}v_{xo}e^{-\tfrac{k}{m}t} + x_o + \frac{m}{k}v_{xo}
\end{align*}
%
\begin{equation}
    \boxed{\therefore x(t) = \frac{m}{k}v_{xo}\left(1-e^{-\tfrac{k}{m}t}\right) + x_o}
\end{equation}
%
% Vertical Direction
\subsection{Vertical Direction} %
Solving in the y-direction results in:
\begin{align*}
    m\differtiate{v_y(t)}{t} &= -mg - kv_y & v_y(0) &= v_{yo} \\
    \differtiate{v_y(t)}{t} &= -g - \frac{k}{m}v_y \\
    \int \frac{\differtial{v_y}}{-g - \tfrac{k}{m}v_y} &= \int \differtial{t} \\
    -\frac{m}{k}\ln\left|-g - \frac{k}{m}v_y\right| &= t + C & v_y(0) = v_{yo} &\implies C = -\frac{m}{k}\ln\left|-g - \frac{k}{m}v_{yo}\right| \\
    -\frac{m}{k}\ln\left|-g - \frac{k}{m}v_y\right| &= t - \frac{m}{k}\ln\left|-g - \frac{k}{m}v_{yo}\right| \\
    \ln\left|-g - \frac{k}{m}v_y\right| &= -\frac{k}{m}t + \ln\left|-g - \frac{k}{m}v_{yo}\right| \\
    -g - \frac{k}{m}v_y &= e^{-\tfrac{k}{m}t}\left(-g - \frac{k}{m}v_{yo}\right) \\
    -\frac{k}{m}v_y &= e^{-\tfrac{k}{m}t}\left(-g - \frac{k}{m}v_{yo}\right) + g
\end{align*}
%
\begin{equation}
    \boxed{\therefore v_y(t) = e^{-\tfrac{k}{m}t}\left(\frac{mg}{k} + v_{yo}\right) - \frac{mg}{k}}    
\end{equation}
%
We can find the acceleration and position function now.
\begin{align*}
    a_y(t) &= \differtiate{v_y(t)}{t} \\
    &= \differtiate{e^{-\tfrac{k}{m}t}\left(\frac{mg}{k} + v_{yo}\right) - \frac{mg}{k}}{t}
\end{align*}
%
\begin{equation}
    \boxed{\therefore a_y(t) = -\frac{k}{m}\left(\frac{mg}{k} + v_{yo}\right)e^{-\tfrac{k}{m}t}} 
\end{equation}
%
\begin{align*}
    y(t) &= \int v_y(t) & y(0) &= y_o \\
    &= \int \left(e^{-\tfrac{k}{m}t}\left(\frac{mg}{k} + v_{yo}\right) - \frac{mg}{k}\right) \differtial{t} \\
    &= -\frac{m}{k}e^{-\tfrac{k}{m}t}\left(\frac{mg}{k} + v_{yo}\right) - \frac{mg}{k}t + C & y(0) = y_o &\implies C = y_o + \frac{m}{k}\left(\frac{mg}{k} + v_{yo}\right) \\
    &= -\frac{m}{k}e^{-\tfrac{k}{m}t}\left(\frac{mg}{k} + v_{yo}\right) - \frac{mg}{k}t + y_o + \frac{m}{k}\left(\frac{mg}{k} + v_{yo}\right)
\end{align*}
%
\begin{equation}
    \boxed{\therefore y(t) = \frac{m}{k}\left(\frac{mg}{k} + v_{yo}\right)\left(1 - e^{-\tfrac{k}{m}t}\right) - \frac{mg}{k}t + y_o}
\end{equation}
%
We can see if we would not accelerate indefinitely but will reach a terminal velocity.
\begin{align*}
    v_T &= \lim_{t\to\infty}\left(v_y(t)\right) \\
    &= \lim_{t\to\infty}\left(e^{-\tfrac{k}{m}t}\left(\frac{mg}{k} + v_{yo}\right) - \frac{mg}{k}\right)
\end{align*}
%
\begin{equation} \boxed{v_T = -\frac{mg}{k}} \end{equation}
%
% Summary
\subsection{Summary}
Overall, we have our functions for acceleration, velocity, and position.
\begin{align}
    \vect{a(t)} &= 
    \begin{pmatrix} -\dfrac{k}{m}v_{xo}e^{-\tfrac{k}{m}t} \\ -\dfrac{k}{m}\left(\dfrac{mg}{k} + v_{yo}\right)e^{-\tfrac{k}{m}t} \end{pmatrix} \\
    \vect{v(t)} &= 
    \begin{pmatrix} v_{xo}e^{-\tfrac{k}{m}t} \\ e^{-\tfrac{k}{m}t}\left(\dfrac{mg}{k} + v_{yo}\right) - \dfrac{mg}{k} \end{pmatrix} \\
    \vect{s(t)} &= 
    \begin{pmatrix} \dfrac{m}{k}v_{xo}\left(1-e^{-\tfrac{k}{m}t}\right)+x_o \\ \dfrac{m}{k}\left(\dfrac{mg}{k} + v_{yo}\right)\left(1 - e^{-\tfrac{k}{m}t}\right) - \dfrac{mg}{k}t + y_o \end{pmatrix}
\end{align}
%
In three dimensions, the x and y functions are the same as the x function in two dimensions and the z function is the same as the y function.
\begin{align}
    \vect{a(t)} &= \begin{pmatrix} -\dfrac{k}{m}v_{xo}e^{-\tfrac{k}{m}t} \\ -\dfrac{k}{m}v_{xo}e^{-\tfrac{k}{m}t} \\ -\dfrac{k}{m}\left(\dfrac{mg}{k} + v_{yo}\right)e^{-\tfrac{k}{m}t} \end{pmatrix} \\
    \vect{v(t)} &= \begin{pmatrix} v_{xo}e^{-\tfrac{k}{m}t} \\ v_{xo}e^{-\tfrac{k}{m}t} \\ e^{-\tfrac{k}{m}t}\left(\dfrac{mg}{k} + v_{yo}\right) - \dfrac{mg}{k} \end{pmatrix} \\
    \vect{s(t)} &= \begin{pmatrix} \dfrac{m}{k}v_{xo}\left(1-e^{-\tfrac{k}{m}t}\right)+x_o \\ \dfrac{m}{k}v_{xo}\left(1-e^{-\tfrac{k}{m}t}\right)+x_o \\ \dfrac{m}{k}\left(\dfrac{mg}{k} + v_{yo}\right)\left(1 - e^{-\tfrac{k}{m}t}\right) - \dfrac{mg}{k}t + y_o \end{pmatrix}
\end{align}
%
It is possible to rotated the xy plane such that xz plane is the only plane that contains motion. This enables to just use the two-dimensional version.
%
%
% Resistance Proportional to the Square of Velocity
\section{Resistance Proportional to the Square of Velocity} %
The relationship, $F_R \propto \vect{v}^2$ will lead to a more accurate model but is more difficult equation to solve analytically. The velocity always opposes the direction the object is heading. Therefore, the force can be positive or negative.
\begin{align}
    \begin{pmatrix} F_x \\ F_y \end{pmatrix} &= \begin{pmatrix} F_R \\ F_g + F_R \end{pmatrix} 
    & \mathrm{where} \;  \begin{matrix} F_g = -mg \\ F_R = \pm kv^2   \rightarrow -kv|v| \end{matrix}\\ %
    \begin{pmatrix} m\differtiate{v_x(t)}{t} \\[0.3em] m\differtiate{v_y(t)}{t} \end{pmatrix} &= \begin{pmatrix} \pm kv^2 \\ -mg \pm kv^2 \end{pmatrix} &
\end{align}
%
It is necessary to evaluate separately whether the velocity is positive or negative.
%
% Horizontal Direction
\subsection{Horizontal Direction} %
Velocity can only be positive to simplify calculations.
\begin{align*}
    m\differtiate{v_x}{t} &= -kv_x^2 & v_x(0) &= v_{xo} \\
    \int \dfrac{\differtial{v_x}}{v_x^2} &= \int -\dfrac{k}{m} \differtial{t}\\
    -\frac{1}{v_x} &= -\dfrac{k}{m}t + C & v_x(0) = v_{xo} &\implies C = -\frac{1}{v_{xo}} \\
    -\frac{1}{v_x} &= -\dfrac{k}{m}t - \frac{1}{v_{xo}} \\
    \frac{1}{v_x} &= \dfrac{k}{m}t + \frac{1}{v_{xo}} \\
    v_x &= \frac{1}{\tfrac{k}{m}t + \tfrac{1}{v_{xo}}} \\
    &= \frac{1}{\tfrac{kv_{xo}t+m}{mv_{xo}}}
\end{align*}
%
\begin{equation}
    \boxed{\therefore v_x(t) = \frac{mv_{xo}}{kv_{xo}t+m}}
\end{equation}
%
We can find the acceleration and position function now.
\begin{align*}
    a_x(t) &= \differtiate{v_x(t)}{t} \\
    &= \differtiate{\frac{mv_{xo}}{kv_{xo}t+m}}{t} \\
    &= -mv_{xo}\left(\frac{1}{(kv_{xo}t+m)^2}\right)kv_{xo}
\end{align*}
%
\begin{equation}
    \boxed{\therefore a_x(t) = -\frac{mkv_{xo}^2}{(kv_{xo}t+m)^2}}
\end{equation}
%
\begin{align*}
    x(t) &= \int v_x(t) & x(0) &= x_o \\
    &= \int \frac{mv_{xo}}{kv_{xo}t+m} \differtial{t} \\
    &= \frac{mv_{xo}}{kv_{xo}}\ln\left|kv_{xo}t+m\right| + C & x(0) = x_o &\implies C = x_o - \frac{m}{k}\ln(m) \\
    &= \frac{m}{k}\ln\left|kv_{xo}t+m\right| + x_o - \frac{m}{k}\ln(m)
\end{align*}
%
\begin{equation}
    \boxed{\therefore x(t) = x_o + \frac{m}{k}\ln\left|\frac{kv_{xo}t+m}{m}\right|}    
\end{equation}
%
% Vertical Direction
\subsection{Vertical Direction} %
It is necessary to determine whether the force of resistance is positive or negative and that will determine what the sign for velocity will be. Nonetheless, we will need to solve for two separate situations.
%
\subsubsection{Upward Velocity}
\begin{equation} v_y\geq 0 \implies m\differtiate{v_y(t)}{t}=-mg-kv_y^2 \end{equation}
%
\begin{align*}
    m\differtiate{v_y(t)}{t} &= -mg - kv_y^2 & v_y(0) &= v_{yo} \\
    \differtiate{v_y(t)}{t} &= -g - \frac{k}{m}v_y \\
    \int \frac{\differtial{v_y}}{-g - \tfrac{k}{m}v_y^2} &= \int \differtial{t} & \int\frac{dx}{a+bx^2} &= \frac{1}{\sqrt{ab}}\arctan\left(\sqrt{\frac{b}{a}}x\right) + C \\
    \frac{-1}{\sqrt{g\tfrac{k}{m}}}\arctan\left(\sqrt{\frac{\tfrac{k}{m}}{g}}v_y\right) &= t + C \\
    v_y(0) = v_{yo} &\implies C = -\sqrt{\frac{m}{kg}}\arctan\left(\sqrt{\frac{k}{mg}}v_{yo}\right) \\
    -\sqrt{\frac{m}{kg}}\arctan\left(\sqrt{\frac{k}{mg}}v_{y}\right) &= t - \sqrt{\frac{m}{kg}}\arctan\left(\sqrt{\frac{k}{mg}}v_{yo}\right) \\
    \arctan\left(\sqrt{\frac{k}{mg}}v_{y}\right) &= -\sqrt{\frac{kg}{m}}t + \arctan\left(\sqrt{\frac{k}{mg}}v_{yo}\right) \\
    \sqrt{\frac{k}{mg}}v_{y} &= \tan\left(\arctan\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)
\end{align*}
%
\begin{equation}
    \boxed{\therefore v_y(t) = \sqrt{\frac{mg}{k}}\tan\left(\arctan\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)}
\end{equation}
%
We can find the acceleration and position function now.
\begin{align*}
    a_y(t) &= \differtiate{v_y(t)}{t} \\
    &= \differtiate{\sqrt{\frac{mg}{k}}\tan\left(\arctan\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)}{t}
\end{align*}
%
\begin{equation}
    \boxed{\therefore a_y(t) = -g\sec^2\left(\arctan\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)}
\end{equation}
%
\begin{align*}
    y(t) &= \int v_x(t), \quad\quad y(0) = y_o \\
    &= \int \sqrt{\frac{mg}{k}}\tan\left(\arctan\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right) \differtial{t} \\
    &= \sqrt{\frac{mg}{k}}\sqrt{\frac{m}{kg}}\ln\left|\cos\left(\arctan\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)\right| + C \\
    &= \frac{m}{k}\ln\left|\cos\left(\arctan\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)\right| + C \\ 
    y(0) = y_o &\implies C = y_o - \frac{m}{k}\ln\left|\cos\left(\arctan\left(\sqrt{\frac{k}{mg}}v_{yo}\right)\right)\right| \\ 
    y(t) &= \frac{m}{k}\ln\left|\cos\left(\arctan\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)\right| + y_o - \frac{m}{k}\ln\left|\cos\left(\arctan\left(\sqrt{\frac{k}{mg}}v_{yo}\right)\right)\right|
\end{align*}
%
\begin{equation}
    \boxed{\therefore y(t) = \frac{m}{k}\ln\left|\frac{\cos\left(\arctan\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)}{\cos\left(\arctan\left(\sqrt{\frac{k}{mg}}v_{yo}\right)\right)}\right|}    
\end{equation}
%
\subsubsection{Downward Velocity}
\begin{equation} v_y< 0 \implies m\differtiate{v_y(t)}{t}=-mg+kv_y^2 \end{equation}
%
\begin{align*}
    m\differtiate{v_y(t)}{t} &= kv_y^2 - mg & v_y(0) &= v_{yo} \\
    \differtiate{v_y(t)}{t} &= \frac{k}{m}v_y^2 - g \\
    \int \frac{\differtial{v_y}}{\tfrac{k}{m}v_y^2 - g} &= \int \differtial{t} & \int\frac{dx}{a-bx^2} &= \frac{1}{\sqrt{ab}}\arctanh\left(\sqrt{\frac{b}{a}}x\right) + C \\
    \frac{-1}{\sqrt{g\tfrac{k}{m}}}\arctanh\left(\sqrt{\frac{\tfrac{k}{m}}{g}}v_y\right) &= t + C \\
    v_y(0) = v_{yo} &\implies C = -\sqrt{\frac{m}{kg}}\arctanh\left(\sqrt{\frac{k}{mg}}v_{yo}\right) \\
    -\sqrt{\frac{m}{kg}}\arctanh\left(\sqrt{\frac{k}{mg}}v_{y}\right) &= t - \sqrt{\frac{m}{kg}}\arctanh\left(\sqrt{\frac{k}{mg}}v_{yo}\right) \\
    \arctanh\left(\sqrt{\frac{k}{mg}}v_{y}\right) &= -\sqrt{\frac{kg}{m}}t + \arctanh\left(\sqrt{\frac{k}{mg}}v_{yo}\right) \\
    \sqrt{\frac{k}{mg}}v_{y} &= \tanh\left(\arctanh\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)
\end{align*}
%
\begin{equation}
    \boxed{\therefore v_y(t) = \sqrt{\frac{mg}{k}}\tanh\left(\arctanh\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)}
\end{equation}
%
We can find the acceleration and position function now.
\begin{align*}
    a_y(t) &= \differtiate{v_y(t)}{t} \\
    &= \differtiate{\sqrt{\frac{mg}{k}}\tanh\left(\arctanh\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)}{t}
\end{align*}
%
\begin{equation}
    \boxed{\therefore a_y(t) = -g\sech^2\left(\arctanh\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)}   
\end{equation}
%
\begin{align*}
    y(t) &= \int v_x(t), \quad\quad y(0) = y_o \\
    &= \int \sqrt{\frac{mg}{k}}\tanh\left(\arctanh\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right) \differtial{t} \\
    &= -\sqrt{\frac{mg}{k}}\sqrt{\frac{m}{kg}}\ln\left|\cosh\left(\arctanh\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)\right| + C \\
    &= -\frac{m}{k}\ln\left|\cosh\left(\arctanh\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)\right| + C \\ 
    y(0) = y_o &\implies C = y_o + \frac{m}{k}\ln\left|\cosh\left(\arctanh\left(\sqrt{\frac{k}{mg}}v_{yo}\right)\right)\right| \\ 
    y(t) &= -\frac{m}{k}\ln\left|\cosh\left(\arctanh\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)\right| + y_o + \frac{m}{k}\ln\left|\cosh\left(\arctanh\left(\sqrt{\frac{k}{mg}}v_{yo}\right)\right)\right|
\end{align*}
%
\begin{equation}
    \boxed{\therefore y(t) = y_o - \frac{m}{k}\ln\left|\frac{\cosh\left(\arctanh\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)}{\cosh\left(\arctanh\left(\sqrt{\frac{k}{mg}}v_{yo}\right)\right)}\right|}
\end{equation}
%
Again we can calculate the terminal velocity of the object.
\begin{align*}
    v_T &= \lim_{t\to\infty}\left(v_y(t)\right) \\
    &= \lim_{t\to\infty}\left(\sqrt{\frac{mg}{k}}\tanh\left(\arctanh\left(\sqrt{\frac{k}{mg}}v_{yo}\right) - \sqrt{\frac{kg}{m}}t\right)\right)
\end{align*}
%
\begin{equation}
    \boxed{v_T = -\sqrt{\frac{mg}{k}}}    
\end{equation}
%
\subsubsection{Summary of Vertical Direction}
Overall, we have our functions for acceleration, velocity, and position in the vertical direction. Of course the absolute values are unnecessary since the functions are only defined for $t\geq0$.
\begin{align}
    a_y(t) &= \begin{cases} 
        -g\sec^2\left(\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right) - \sqrt{\dfrac{kg}{m}}t\right) & v\geq 0 \\
        -g\sech^2\left(\arctanh\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right) - \sqrt{\dfrac{kg}{m}}t\right) & v<0 \\
    \end{cases} \\
    v_y(t) &= \begin{cases} 
        \sqrt{\dfrac{mg}{k}}\tan\left(\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right) - \sqrt{\dfrac{kg}{m}}t\right) & v\geq 0 \\
        \sqrt{\dfrac{mg}{k}}\tanh\left(\arctanh\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right) - \sqrt{\dfrac{kg}{m}}t\right) & v<0 \\
    \end{cases} \\
    y(t) &= \begin{cases} 
        y_o + \dfrac{m}{k}\ln\left(\dfrac{\cos\left(\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right) - \sqrt{\dfrac{kg}{m}}t\right)}{\cos\left(\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right)\right)}\right) & v\geq 0 \\
        y_o - \dfrac{m}{k}\ln\left(\dfrac{\cosh\left(\arctanh\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right) - \sqrt{\dfrac{kg}{m}}t\right)}{\cosh\left(\arctanh\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right)\right)}\right) & v<0 \\
    \end{cases}
\end{align}
%
When $v_y$ transitions from $0^+\rightarrow0^-$, it can be noted that $v_{yo}=0$. This simplifies our set of equations. However, it is necessary to shift the functions to match the when it transitions. We can calculate when this time delay, $\tau$, is.
\begin{align*}
    v_y(t) &= \sqrt{\dfrac{mg}{k}}\tan\left(\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right) - \sqrt{\dfrac{kg}{m}}t\right) \\
    \sqrt{\dfrac{k}{mg}}v_y &= \tan\left(\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right) - \sqrt{\dfrac{kg}{m}}t\right) \\
    \arctan\left(\sqrt{\dfrac{k}{mg}}v_y\right) &= \arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right) - \sqrt{\dfrac{kg}{m}}t \\
    \arctan\left(\sqrt{\dfrac{k}{mg}}v_y\right) - \arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right) &= -\sqrt{\dfrac{kg}{m}}t \\
    -\sqrt{\dfrac{m}{kg}}\left(\arctan\left(\sqrt{\dfrac{k}{mg}}v_y\right) - \arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right)\right) &= t
\end{align*}
%
\begin{equation}
    \boxed{\therefore \tau = \sqrt{\dfrac{m}{kg}}\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right)}
\end{equation}
%
As well, due to this simplification, we must compensate for the distance lost in the position functions. We can find how much that is by evaluating the position function at $\tau$.
\begin{align*}
    y_\tau &= y_o + \dfrac{m}{k}\ln\left(\dfrac{\cos\left(\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right) - \sqrt{\dfrac{kg}{m}}\sqrt{\dfrac{m}{kg}}\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right)\right)}{\cos\left(\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right)\right)}\right) \\ 
    &= y_o + \dfrac{m}{k}\ln\left(\dfrac{\cos\left(\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right) - \arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right)\right)}{\cos\left(\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right)\right)}\right) \\ 
    &= y_o + \dfrac{m}{k}\ln\left(\dfrac{1}{\cos\left(\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right)\right)}\right)
\end{align*}
%
\begin{equation}
    \boxed{y_\tau = y_o + \dfrac{m}{k}\ln\left(\sqrt{1+\dfrac{k}{mg}v_{yo}^2}\right)}  
\end{equation}
%
Through these simplifications, we now have our final vertical equations. The bounds have changed to be dependant on time.
\begin{align}
    a_y(t) &= \begin{cases} 
        -g\sec^2\left(\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right) - \sqrt{\dfrac{kg}{m}}t\right) & t\leq \tau \\
        -g\sech^2\left(-\sqrt{\dfrac{kg}{m}}(t-\tau)\right) & t>\tau \\
    \end{cases} \\
    v_y(t) &= \begin{cases} 
        \sqrt{\dfrac{mg}{k}}\tan\left(\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right) - \sqrt{\dfrac{kg}{m}}t\right) & t\leq \tau \\
        \sqrt{\dfrac{mg}{k}}\tanh\left(-\sqrt{\dfrac{kg}{m}}(t-\tau)\right) & t>\tau \\
    \end{cases} \\
    y(t) &= \begin{cases} 
        y_o + \dfrac{m}{k}\ln\left(\dfrac{\cos\left(\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right) - \sqrt{\dfrac{kg}{m}}t\right)}{\cos\left(\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right)\right)}\right) & t\leq \tau \\
        y_\tau - \dfrac{m}{k}\ln\left(\cosh\left(\sqrt{\dfrac{kg}{m}}(t-\tau)\right)\right) & t>\tau
    \end{cases}
\end{align}
%
\begin{align}
    \text{Where, } \quad \tau &= \sqrt{\dfrac{m}{kg}}\arctan\left(\sqrt{\dfrac{k}{mg}}v_{yo}\right) \\
    y_\tau &= y_o + \dfrac{m}{k}\ln\left(\sqrt{1+\dfrac{k}{mg}v_{yo}^2}\right)
\end{align}
%
Of course, if the initial velocity is negative, the first set of equations are still valid.
%
% Summary
\subsection{Summary}
Overall, we have our functions for acceleration, velocity, and position. The equations shortened can be found above.
\begin{align}
    \vect{a(t)} &= 
    \begin{pmatrix} -\dfrac{mkv_{xo}^2}{(kv_{xo}t+m)^2} \\ a_y(t) \end{pmatrix} \\
    \vect{v(t)} &= 
    \begin{pmatrix} \dfrac{mv_{xo}}{kv_{xo}t+m} \\ v_y(t) \end{pmatrix} \\
    \vect{s(t)} &= 
    \begin{pmatrix} x_o + \dfrac{m}{k}\ln\left|\dfrac{kv_{xo}t+m}{m}\right| \\ y(t) \end{pmatrix}
\end{align}
%
In three dimensions, the x and y functions are the same as the x function in two dimensions and the z function is the same as the y function.
\begin{align}
    \vect{a(t)} &= \begin{pmatrix} -\dfrac{mkv_{xo}^2}{(kv_{xo}t+m)^2} \\ -\dfrac{mkv_{xo}^2}{(kv_{xo}t+m)^2} \\ a_z(t) \end{pmatrix} \\
    \vect{v(t)} &= \begin{pmatrix} \dfrac{mv_{xo}}{kv_{xo}t+m} \\ \dfrac{mv_{xo}}{kv_{xo}t+m} \\ v_z(t) \end{pmatrix} \\
    \vect{s(t)} &= \begin{pmatrix} x_o + \dfrac{m}{k}\ln\left|\dfrac{kv_{xo}t+m}{m}\right| \\ x_o + \dfrac{m}{k}\ln\left|\dfrac{kv_{xo}t+m}{m}\right| \\ z(t) \end{pmatrix}
\end{align}
\newpage
%
% Projecting from Three to Two Dimensions
\section{Projecting from Three to Two Dimensions}
It is possible to rotated the xy plane such that xz plane is the only plane that contains motion. This enables to just use the two-dimensional version making it computationally easier. This is only possible since the x and y coordinates are not affected by the force of gravity and are defined by the same equation.
\newline
%
We first project the original $\mathbb{R}^3$ onto the xy plane. This results in a $\mathbb{R}^2$ vector that includes the magnitude of the xy plane and z coordinate. To convert back. We need to project the vector onto the x and y coordinates separately.
\begin{align}
    \vect{v_{o}} &= \overbrace{\begin{pmatrix} a \\ b \\ c \end{pmatrix}}^{\mathbb{R}^3} & &\Longleftrightarrow &
    \vect{v_{o(proj)}} &= \overbrace{\begin{pmatrix} \sqrt{a^2+b^2} \\ c \end{pmatrix}}^{\mathbb{R}^2} \implies 
    \vect{v_{proj}(t)} = \begin{pmatrix} v_{xy} \\ v_z \end{pmatrix} \\
    \vect{v_{proj}(t)} &= \overbrace{\begin{pmatrix} v_{xy} \\ v_z \end{pmatrix}}^{\mathbb{R}^2} & &\Longleftrightarrow &
    \vect{v(t)} &= \overbrace{\begin{pmatrix} v_{xy}\dfrac{a}{\sqrt{a^2+b^2}} \\ v_{xy}\dfrac{b}{\sqrt{a^2+b^2}} \\ v_z \end{pmatrix}}^{\mathbb{R}^3}
\end{align}
%
%
\end{document}