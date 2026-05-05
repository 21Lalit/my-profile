# ~/.bashrc – Lalit Rohilla's Bash config

# Prompt
PS1='\[\e[01;32m\]\u@ubuntu\[\e[00m\]:\[\e[01;34m\]\w\[\e[00m\]\$ '

# Aliases
alias ll='ls -alF'
alias la='ls -A'
alias grep='grep --color=auto'
alias cls='clear'

# Cybersecurity shortcuts
alias nmap-quick='nmap -sV -sC -O'
alias scan='nmap -sV -sC'

# Path
export PATH="$HOME/.local/bin:$PATH"

echo "Welcome back, Lalit! 🔐"
