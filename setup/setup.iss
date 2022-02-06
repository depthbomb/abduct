#include "buttons.iss"

#define MyAppName "Abduct"
#define MyAppVersion "1.0.0.0"
#define MyAppPublisher "Caprine Logic"
#define MyAppURL "https://github.com/depthbomb/abduct"
#define MyAppExeName "abduct.exe"

[Setup]
AppId={{E1675BAB-A621-4117-BFA7-27FF6208BE1B}
AppName={#MyAppName}
AppVerName="{#MyAppName} {#MyAppVersion}"
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
DisableDirPage=yes
DisableProgramGroupPage=yes
; Remove the following line to run in administrative install mode (install for all users.)
PrivilegesRequired=lowest
OutputDir=../build
OutputBaseFilename=abduct-setup
SetupIconFile=../resources/icon.ico
Compression=lzma2/ultra64
SolidCompression=yes
WizardStyle=classic
ArchitecturesAllowed=x64

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "..\build\win-unpacked\{#MyAppExeName}"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\win-unpacked\locales\*"; DestDir: "{app}\locales"; Flags: ignoreversion
Source: "..\build\win-unpacked\resources\*"; DestDir: "{app}\resources"; Flags: ignoreversion
Source: "..\build\win-unpacked\resources\bin\*"; DestDir: "{app}\resources\bin"; Flags: ignoreversion
Source: "..\build\win-unpacked\swiftshader\*"; DestDir: "{app}\swiftshader"; Flags: ignoreversion
Source: "..\build\win-unpacked\chrome_100_percent.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\win-unpacked\chrome_200_percent.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\win-unpacked\d3dcompiler_47.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\win-unpacked\ffmpeg.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\win-unpacked\icudtl.dat"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\win-unpacked\libEGL.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\win-unpacked\libGLESv2.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\win-unpacked\resources.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\win-unpacked\snapshot_blob.bin"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\win-unpacked\v8_context_snapshot.bin"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\win-unpacked\vk_swiftshader.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\win-unpacked\vk_swiftshader_icd.json"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\build\win-unpacked\vulkan-1.dll"; DestDir: "{app}"; Flags: ignoreversion
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

