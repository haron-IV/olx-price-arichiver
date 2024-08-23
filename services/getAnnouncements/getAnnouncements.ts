import { error } from "console"
import type { Announcements } from "./getAnnouncements.types"

export const getAnnouncements = async (): Promise<Announcements | string | undefined> => {
  try {
    const response = await fetch("https://www.olx.pl/api/v1/users/me/observed-ads/", {
      headers: {
        accept: "*/*",
        "accept-language": "pl",
        authorization: `Bearer ${process.env.TOKEN}`,
        priority: "u=1, i",
        "sec-ch-ua": '"Not;A=Brand";v="24", "Chromium";v="128"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-client": "DESKTOP",
        "x-device-id": "b7b8ae46-1b7a-46f6-9e42-3dfa95b83840",
        "x-fingerprint":
          "fbdc4f53959cdb4af9c2a8983d0ffab85c6324e638a283d8d11dae88fc3236ac3fef60c9cf99daeee8380ebb100f22a6faed307981c3a6ca4e1f7a2acddfea3393ba89d2bc096e2900d2d70001a8f4553fef60c9cf99daee9437bcd7a2768f44b497a357830277b800d2d70001a8f45500d2d70001a8f4559c3027904b07e5707dcebc9bff1a2a523fef60c9cf99daeee8380ebb100f22a6d35402d4882fb624a18f252f90584f1ff6e9813aa2a88b6b2aa98c6b03d84b2aaa6925b0558d723aa2dab357225d0511272ec8e83d084c3e29b755643a58ca1b6255da105753936400ab77cc9433c49756b16d11aecc8186311d0fc0132734b6807974a9f4b15c60852c9116963f0d12feab8f5fc555a350982c660e9c183ec952de13ee4191f26cffe2cd767cc6e30ab2a91fd1f357553deff5f4dafaf6cc5781c4694103397b84007c3963de1362e7d8b7668586e5befd9a7cce06fbd6049945ec0f1d83431de81fa7f0020eee7e44d5e3a2df978cc98281c4694103397b84280ef8ea2af2cc74faa23dba1acbfc2f",
        "x-platform-type": "mobile-html5",
        cookie:
          "deviceGUID=b7b8ae46-1b7a-46f6-9e42-3dfa95b83840; OptanonAlertBoxClosed=2024-05-19T13:24:46.629Z; OTAdditionalConsentString=1~89.320.1421.1423.1659.1985.1987.2008.2072.2135.2322.2465.2501.2958.2999.3028.3225.3226.3231.3234.3235.3236.3237.3238.3240.3244.3245.3250.3251.3253.3257.3260.3270.3272.3281.3288.3290.3292.3293.3296.3299.3300.3306.3307.3309.3314.3315.3316.3318.3324.3328.3330.3331.3531.3731.3831.3931.4131.4531.4631.4731.4831.5231.6931.7031.7235.7831.7931.8931.9731.10231.10631.10831.11031.11531.12831.13632.13731.14237.14332.15731.16831.21233.23031.24431.25731.25931.26031.26831.27731.28031.28731.28831.29631; __gsas=ID=86085d0744af6c88:T=1716125102:RT=1716125102:S=ALNI_MYE0seWW1yP0ob8l1rzO1N_H35Hiw; _hjSessionUser_1685071=eyJpZCI6IjNhN2QwOGY3LTU1MzAtNWU5Zi05N2U4LWRhYTM1NTA1YmI2MSIsImNyZWF0ZWQiOjE3MTYxMjUwODcwODgsImV4aXN0aW5nIjp0cnVlfQ==; mobile_default=desktop; eupubconsent-v2=CQDzRDAQDzRDAAcABBENBCF8AP_gAAAAAAYgKENV_G_fbXlj8X50aftkeY1f99h7rsQxBhfJk-4FyLuW_JwX32EzNA16pqYKmRIAu3bBIQFlGIDUDUCgaogVrTDMakWMgTNKJ6BEiFMRe2dYCF5vmwFD-QKY5tpt91d52Ret7dr83dzyz4Vnn3Kp_2a1WJCdA5cgAAAAAAAAAAAAAAAQAAAAAAAAAQAIAAAAAAAAAAAAAAAAAAAAF_cAAAALlAAAAUEgfgAIAAXABQAFQAOAAeABBAC8ANQAeABEACYAFUAN4AegA_ACEgEMARIAjgBLACaAGAAMOAZQBlgDZAHPAO4A74B7AHxAPsA_YB_gIAARSAi4CMAEaAJLAT8BQYCoAKuAXMAvQBigDRAG0ANwAcSBHoEiAJ2AUOAo8BSIC2AFyALvAXmAw2BkYGSAMnAZcAzMBnMDVwNZAbGA28BuoDggHJgOXCAFgAHAAkACOAQcAjgBNAC-gJWATaApABXICwgFiALyAYgAxYBkIDRgGpgNoAbcA3QcApAARAA4ADwALgAkAB-AEcANAAjgByAEAgIOAhABEQCOAE0AKgAdIBCACVgExAJlATaApOBXIFdgLEAWoAugBggDEAGLAMhAZMA0YBqYDXgG0ANsAbcA3QBx4DloHOgc-OgkgALgAoACoAHAAQQAuADUAHgARAAmABVgC4ALoAYgA3gB6AD9AIYAiQBLACaAFGAMAAYYAygBogDZAHPAO4A7wB7QD7AP0Af8BFAEYgI6AksBPwFBgKiAq4BYgC5wF5AXoAxQBtADcAHEAOoAfYBF8CPQJEATIAnYBQ8CjwKQAU0AqwBYoC2AFugLgAXIAu0Bd4C8wF9AMNAY9AyMDJAGTgMqgZYBlwDMwGcgNNgauBrADbwG6gOLAcmA5cgAVAAQAA8ANAA5ACOAFiAL6Am0BSYCuQFiALyAYIAzwBowDUwG2ANuAboA5YBz5CBAAAsACgALgAagBVAC4AGIAN4AegBHADAAHPAO4A7wB_gEUAJSAUGAqICrgFzAMUAbQA6gCPQFNAKsAWKAtEBcAC5AGRgMnAZySgQgAIAAWABQADgAPAAiABMACqAFwAMUAhgCJAEcAKMAYAA2QB3gD8gKiAq4BcwDFAHUARMAi-BHoEiAKPAWKAtgBecDIwMkAZOAzkBrADbyQBEAC4ARwB3AEAAIOARwAqACVgExAJtAUmAxYBlgDPAG5AN0AcsUgcgALgAoACoAHAAQAA0AB4AEQAJgAVQAxAB-gEMARIAowBgADKAGiANkAc4A74B-AH6ARYAjEBHQElAKDAVEBVwC5gF5AMUAbQA3AB1AD2gH2ARMAi-BHoEiAJ2AUOApABVgCxQFsALgAXIAu0BeYC-gGGwMjAyQBk8DLAMuAZzA1gDWQG3gN1AcEA5MoAfAAuACQAFwAMgAjgCOAHIAO4AfYBAACDgFiALqAa8A7YB_wExAJtAVIArsBdAC8gGCAMWAZMAzwBowDUwGvAN0AcsA.f_wAAAAAAAAA; _gid=GA1.2.2094962750.1724408987; laquesissu=295@listing|1#733@user_dropped_off_promote_flow|0#735@magic_search_results|1#742@magic_ad_link|0; _gcl_au=1.1.872081806.1724408987; _sharedid=16a1ecb3-64d6-43da-92c6-416502c189f7; _sharedid_cst=uixqLO8sBQ%3D%3D; _cc_id=28e2405c45aa4496f195a62ee95ee1e4; panoramaId_expiry=1724495389782; fingerprint=MTI1NzY4MzI5MTs4OzA7MDswOzE7MDswOzA7MDswOzE7MTsxOzE7MTsxOzE7MTsxOzE7MTsxOzE7MTswOzE7MTsxOzE7MDswOzA7MDswOzA7MTsxOzE7MTsxOzA7MTswOzA7MTsxOzE7MDswOzA7MDswOzA7MDswOzE7MDswOzA7MDsxOzE7MDsxOzE7MTsxOzE7MTsxOzA7MTswOzIwMjI4Mzc0OTQ7MjsyOzI7MjswOzI7NTsyODQ4MDA2NDE4OzEzNTcwNDE3Mzg7MTsxOzE7MTswOzE7MTsxOzE7MTsxOzE7MTsxOzE7MTsxOzA7MTswOzQxMDAyMTk5OzM0NjkzMDY1NTE7MjA2NTI4OTU5Ozc4NTI0NzAyOTszOTU1NDQ4NjkzOzE2ODA7MTA1MDszMDszMDsxMjA7NjA7MTIwOzYwOzEyMDs2MDsxMjA7NjA7MTIwOzYwOzEyMDs2MDsxMjA7NjA7MTIwOzYwOzEyMDs2MDsxMjA7NjA7MDswOzA=; __utma=221885126.717072123.1716125087.1724409150.1724409150.1; __utmc=221885126; __utmz=221885126.1724409150.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __gfp_64b=e.3Mf0xdU1DxeB1YAQY0neVA_2QQbIZ3BacsdNLF69X.47|1716125086|2; a_access_token=25d97d6aec2078512813401b8034c066a7ce4493; a_refresh_token=0a0cfc710435fa1db8002e328a02e288de4353c4; a_grant_type=device; user_business_status=private; ab.storage.sessionId.535b859e-9238-4873-a90e-4c76b15ce078=%7B%22g%22%3A%2238c178a0-5c2a-5f0d-eb7d-871ffc8da697%22%2C%22e%22%3A1724411146124%2C%22c%22%3A1724409346124%2C%22l%22%3A1724409346124%7D; ab.storage.deviceId.535b859e-9238-4873-a90e-4c76b15ce078=%7B%22g%22%3A%22a1044ab3-0b25-e427-4b41-81c2e0433740%22%2C%22c%22%3A1716125097259%2C%22l%22%3A1724409346124%7D; ab.storage.userId.535b859e-9238-4873-a90e-4c76b15ce078=%7B%22g%22%3A%222f5d0141-df00-48d7-a531-f361321ca960%22%2C%22c%22%3A1716126749718%2C%22l%22%3A1724409346125%7D; _legacy_auth0.6j7elk01p32o648o1io8lvhhab.is.authenticated=true; auth0.6j7elk01p32o648o1io8lvhhab.is.authenticated=true; auth_state=eyJzdWIiOiIyZjVkMDE0MS1kZjAwLTQ4ZDctYTUzMS1mMzYxMzIxY2E5NjAifQ==; user_id=1070052181; __user_id_P&S=1070052181; user_id_recs=1070052181; user_uuid=2f5d0141-df00-48d7-a531-f361321ca960; laquesis=aut-3191@b#cars-54958@b#dc-18@b#dc-248@a#erm-1561@b#erm-1623@a#olxeu-41847@b#olxeu-41855@b#olxeu-41938@b#olxeu-41974@b#olxeu-42013@b#search-728@b#search-793@a#search-794@c#search-878@a#search-911@b#tsm-208@a; laquesisff=a2b-000#a2b-1748#aut-1425#aut-388#bl-2928#buy-2279#buy-2489#buy-4410#cou-1670#dat-2874#de-1514#de-1927#de-1928#de-2559#de-2724#decision-256#do-2963#do-3216#do-3418#euit-2250#euonb-114#f8nrp-1779#grw-124#jobs-7611#kuna-307#kuna-554#kuna-603#mart-1341#mou-1052#mou-1573#mou-1575#mou-1979#mou-2077#oesx-1437#oesx-2063#oesx-2798#oesx-2864#oesx-2926#oesx-3069#oesx-3150#oesx-3713#oesx-645#oesx-867#olxeu-0000#psm-308#psm-402#psm-457#psm-574#rm-28#rm-707#rm-824#sd-2240#sd-2759#sd-570#srt-1289#srt-1346#srt-1348#srt-1434#srt-1593#srt-1758#srt-683#uacc-529#uacc-561#up-90; session_start_date=1724428096600; _hjSession_1685071=eyJpZCI6IjM0ZDQxNzM5LTgzMzAtNDFlNS1hNDM1LTUwY2ZiNmZmMjI5MyIsImMiOjE3MjQ0MjYyOTY4MDEsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowfQ==; access_token=eyJraWQiOiJSTWxVTFJrZXlcLzFXUzQ5eTVwSXdLTFdpakFZUjd5UWVNZ00rdktEemVBYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyZjVkMDE0MS1kZjAwLTQ4ZDctYTUzMS1mMzYxMzIxY2E5NjAiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfZFVqRnV2VGY0IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6IjFjYWRlMGRjLTQ4YTUtNDNjOC1iNDFkLWU0Y2Y1N2I4YjgxMSIsImxvY2FsZSI6InBsIiwiY3VzdG9tOmxhc3RfdXNlcm5hbWVfdHlwZSI6ImVtYWlsIiwib3JpZ2luX2p0aSI6IjEzNzI3YmY4LTUyZGEtNGFhMC1iOTgzLWNmNzM3NzI3MGZmMCIsImF1ZCI6IjZqN2VsazAxcDMybzY0OG8xaW84bHZoaGFiIiwiZXZlbnRfaWQiOiI0NmU2MTY0Yi00YWY1LTQxNTQtOTI2My1hNTVlMjQwOWMyZDMiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyNDQyNjI5OCwiZXhwIjoxNzI0NDI3MTk4LCJpYXQiOjE3MjQ0MjYyOTgsImp0aSI6IjJmNGM0NmI4LTRiZWItNDU1NC1iNjkyLTg0NTIyNTViMDg2YSIsImVtYWlsIjoiYmFydC16ZW5AcHJvdG9ubWFpbC5jb20ifQ.kUjUh-JxYl6BS4hEe4I9cp_vaFcsNQcUe4xb-R_olqwL6PtxTclwRq_PP9uEB5fzfIoxQtR4kvXoiMka04JdaAj87USfZzkg6bn9ox_2W8t_S1pRGSnP2DJUWTec3XHik_-ZQwAA7clZJwEJWfSFkqlwZPcswKmDC52wTU-LxnYaapO6arz3CndP1lg9w-FDb21ejS5qt7rf4Jbrf3K3s4PWPU0acDVwSQFUGd_fLZeWloDqtKpO_jiYgPauLTwnzpvPG5vCf9jMwg3GUUVI5qvozxLmsiebU2y4NWnYO4M6y5bJcehz0eCKWV9pPQpss8L4gsvAMDXb2JW5geZ6eQ; PHPSESSID=83sc9ifr5lv0oeammsnvbgmn61; ldTd=true; _gat_clientNinja=1; __gads=ID=d9e6dd679a320517:T=1716125088:RT=1724426300:S=ALNI_MY1T6cHDYSsxMwllU581951LSxNCg; __gpi=UID=00000e252a7a20aa:T=1716125088:RT=1724426300:S=ALNI_MaqYAnZMKVpDypxpPAbd2fRWjOuXQ; __eoi=ID=3290e944d3191d0d:T=1716125088:RT=1724426300:S=AA-AfjbBcLt6rd5HWEhAqQHFu9sP; onap=18f9106b4ccx2db8f598-10-1917fd12b78x61c04196-6-1724428109; _ga=GA1.1.717072123.1716125087; lqstatus=1724427629|1917ec8fc4cx1ece348|search-911|||0; _ga_6PZTQNYS5C=GS1.1.1724426300.10.1.1724426316.44.0.0; _ga_1MNBX75RRH=GS1.1.1724426300.10.1.1724426316.0.0.0; _ga_V1KE40XCLR=GS1.1.1724426300.10.1.1724426316.44.0.0; OptanonConsent=isGpcEnabled=0&datestamp=Fri+Aug+23+2024+17%3A18%3A37+GMT%2B0200+(Central+European+Summer+Time)&version=202402.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&genVendors=V10%3A0%2C&consentId=32cf8e9a-b688-46e0-b9a0-ad218ddc2b54&interactionCount=7&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1%2Cgad%3A1&geolocation=PL%3B12&AwaitingReconsent=false; cto_bundle=76gnxF9wbHg2dERPbjlvdlYlMkJzRGhQbWRtQlpxYUNZU0lXb0UxbUVtRktXN21NTXBKOWxJNHJxVWhXTFdhR1k0ZkpTb1FaTWhmQzliJTJCampOc3JIRzF4SW5EbldhamZNdDBFY1dPTEVwSzIycE84OFJ5bmp1bms4aXFZN09JYlFrVFlpVGlqMm5RTW9XWWdRJTJCZ2xyR0JjcVBVa1ElM0QlM0Q; cto_bidid=XZ6Z8l9JZUM4djRvNzdRdGhNYmhkNU1XWnNlTHFkTVZSZ1plVUlsRWE1YW1ZblBCSVcxRDlDTldXSkoxN0hpVUo3V2VpMDZKN3lVdGN2UkQ4MGVicUp1YzAybXhIeGtpTmpweldZNnFYSTB1akY2cyUzRA",
        Referer: "https://www.olx.pl/observed/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    })

    if (response.status !== 200) throw await response.json()

    return (await response.json()) as Announcements
  } catch (err) {
    error("ERROR WHILE FETCHING:", err)
    if (err && typeof err == "object" && "error" in err) return err.error as string
  }
}
