import express from 'express';
const app = express();
import fetch from 'node-fetch';
import base64 from 'base-64';
import xml2js from 'xml2js';
import body_parser from 'body-parser';
import cors from 'cors';
import date from 'date-and-time';

app.use(body_parser.urlencoded({extended: true}));

app.use(body_parser.json());

// For web services creds
const rfc_username = "ABAPER1"
const rfc_password = "abap@123"

app.use(cors({
    origin: ["http://localhost:4200"]
}));

const PORT = process.env.PORT || 3030;

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

var server_username;
const company_code = "0001";
const sales_org = "0001";


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/login', async (req, res) => {
    console.log(req.body);
    server_username = req.body.uname;
    var req_url = "https://KTINDHNA02.kaartech.com:8001/sap/bc/srt/rfc/sap/zruthu_cp_login_ws/100/zruthu_cp_login_ws/zruthu_cp_login_ws";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                <soapenv:Header/>
                <soapenv:Body>
                  <urn:ZRUTHU_CP_LOGIN_FM>
                      <CUSTOMER_ID>${server_username}</CUSTOMER_ID>
                      <PASSWORD>${req.body.password}</PASSWORD>
                  </urn:ZRUTHU_CP_LOGIN_FM>
                </soapenv:Body>
                </soapenv:Envelope>`

    const login_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        path: req_url,
        headers:{
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(rfc_username + ':' + rfc_password)
            },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(login_res, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            var verify_data = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZRUTHU_CP_LOGIN_FMResponse'][0]['MESSAGE'][0]['TYPE']
            var name_data = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZRUTHU_CP_LOGIN_FMResponse'][0]['NAME']
            var out_data =[verify_data, name_data]
            console.log(out_data);
            res.send(out_data);
        }
    });
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/profile', async (req, res) => {
    // console.log(req.body); 
    var req_url = "https://KTINDHNA02.kaartech.com:8001/sap/bc/srt/rfc/sap/zruthu_cp_profile_ws/100/zruthu_cp_profile_ws/zruthu_cp_profile_ws";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                          <urn:ZRUTHU_CP_PROFILE_FM>
                              <CUSTOMER_ID>${server_username}</CUSTOMER_ID>
                          </urn:ZRUTHU_CP_PROFILE_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const profile_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers:{
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(rfc_username + ':' + rfc_password)
            },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(profile_res, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            var out_data = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZRUTHU_CP_PROFILE_FMResponse'][0]['CUST_PROFILE']
            // console.log(out_data);
            res.send(out_data);
        }
    });
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/inquiry', async (req, res) => {
    var req_url = "https://KTINDHNA02.kaartech.com:8001/sap/bc/srt/rfc/sap/zruthu_cp_inq_ws/100/zruthu_cp_inq_ws/zruthu_cp_inq_ws";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_CP_INQ_FM>
                            <CUSTOMER_ID>${server_username}</CUSTOMER_ID>
                            <IT_INQ_TAB>
                                 
                            </IT_INQ_TAB>
                        </urn:ZRUTHU_CP_INQ_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const login_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        path: req_url,
        headers:{
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(rfc_username + ':' + rfc_password)
            },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    console.log(">>>>>>>>>>>>>>>>>>>");
    console.log(typeof(res));

    xml2js.parseString(login_res, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(typeof(data));
            var out_data = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZRUTHU_CP_INQ_FMResponse'][0]['IT_INQ_TAB'][0]['item']

            if(out_data == null){
                console.log("emptyyyyyyyyyy")
            }
            else {
                out_data.forEach(function (table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                            table[key] = String(table[key]).replace(/^0+/, "");
                      });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(value == "" || value == null){
                            table[key] = "TBA";
                        }
                      });
                });

                /////////////////   DATE    /////////////////////
                out_data.forEach(function (table) {
                    Object.entries(table).forEach(([key, value]) => {
                        if(key == 'ERDAT' || key == 'ANGDT' || key == 'BNDDT'
                           || key == 'AUDAT' || key == 'VDATU') {
                            if(table[key] == "-00-00" || table[key] == "") {
                                table[key] = "TBA"
                            }
                            else {
                                const now = new Date(table[key]);
                                table[key] = date.format(now, 'DD-MM-YYYY');
                            }
                        }
                      })
                    });
                // console.log(out_data);
                res.send(out_data);
            }
        }
    });
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/sales-order-data', async (req, res) => {
    var req_url = "https://KTINDHNA02.kaartech.com:8001/sap/bc/srt/rfc/sap/zruthu_cp_sod_ws/100/zruthu_cp_sod_ws/zruthu_cp_sod_ws";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_CP_SOD_FM>
                            <CUSTOMER_ID>${server_username}</CUSTOMER_ID>
                            <SALES_ORG>${sales_org}</SALES_ORG>
                            <SOD_TAB>
                                
                            </SOD_TAB>
                        </urn:ZRUTHU_CP_SOD_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const login_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        path: req_url,
        headers:{
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(rfc_username + ':' + rfc_password)
            },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(login_res, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            var out_data = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZRUTHU_CP_SOD_FMResponse'][0]['SOD_TAB'][0]['item']
            if(out_data == null){
                console.log("emptyyyyyyyyyy")
            }
            else {
                out_data.forEach(function(table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(key != 'STORE_LOC') {
                            table[key] = String(table[key]).replace(/^0+/, "");
                        }
                      });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        // console.log(key, value)
                        if(value == "" || value == null) {
                            table[key] = "TBA";
                        }
                      });

                    /////////////////   DATE    /////////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(key == 'DOC_DATE' || key == 'REQ_DATE' || key == 'GI_DATE') {
                            if(table[key] == "-00-00") {
                                table[key] = "TBA"
                            }
                            else {
                                const now = new Date(table[key]);
                                table[key] = date.format(now, 'DD-MM-YYYY');
                            }
                        }
                      })
                    });

                                                        /////////////   Preceeding 0's    ////////////////
                                                        //     // SD_DOC
                                                        //     table.SD_DOC[0] = parseInt(table.SD_DOC[0]);
                                                        //     String(table.SD_DOC[0]).replace(/^0+/, "");

                                                        ///////////////    DATE    /////////////////
                                                        // out_data.forEach(function (table) {
                                                        //     // DOC_DATE
                                                        //     if(table.DOC_DATE == "0000-00-00"){
                                                        //         table.DOC_DATE = "TBA"
                                                        //     }
                                                        //     else {
                                                        //         const now = new Date(table.DOC_DATE);
                                                        //         table.DOC_DATE = date.format(now, 'DD-MM-YYYY');
                                                        //     }
                                                        // });
            }
            // console.log(out_data);
            res.send(out_data);
        }
    });
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/list-of-delivery', async (req, res) => {
    var req_url = "https://KTINDHNA02.kaartech.com:8001/sap/bc/srt/rfc/sap/zruthu_cp_lod_ws/100/zruthu_cp_lod_ws/zruthu_cp_lod_ws";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_CP_LOD_FM>
                            <CUSTOMER_ID>${server_username}</CUSTOMER_ID>
                            <LOD_TAB>
                                
                            </LOD_TAB>
                        </urn:ZRUTHU_CP_LOD_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const login_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        path: req_url,
        headers:{
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(rfc_username + ':' + rfc_password)
            },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(login_res, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            var out_data = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZRUTHU_CP_LOD_FMResponse'][0]['LOD_TAB'][0]['item']
            
            if(out_data == null){
                console.log("emptyyyyyyyyyy")
            }
            else {
                out_data.forEach(function(table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        table[key] = String(table[key]).replace(/^0+/, "");
                      });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(value == "" || value == null){
                            table[key] = "TBA";
                        }
                      });

                    Object.entries(table).forEach(([key, value]) => {
                        if(key == 'ERDAT' || key == 'WADAT' || key == 'LDDAT' || key == 'TDDAT' 
                            || key == 'LFDAT' || key == 'KODAT' || key =='FKDAT' || key == 'BLDAT' || key == 'WADAT_IST'){
                            if(table[key] == "-00-00"){
                                table[key] = "TBA"
                            }
                            else {
                                const now = new Date(table[key]);
                                table[key] = date.format(now, 'DD-MM-YYYY');
                            }
                        }
                      });
                });
                // console.log(out_data);
                res.send(out_data);
            }
        }
    });
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/invoice', async (req, res) => {
    var req_url = "https://KTINDHNA02.kaartech.com:8001/sap/bc/srt/rfc/sap/zruthu_cp_invoice_ws/100/zruthu_cp_invoice_ws/zruthu_cp_invoice_ws";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_CP_INVOICE_FM>
                            <CUSTOMER_ID>${server_username}</CUSTOMER_ID>
                            <INVOICE_TAB>
                                
                            </INVOICE_TAB>
                        </urn:ZRUTHU_CP_INVOICE_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const login_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        path: req_url,
        headers:{
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(rfc_username + ':' + rfc_password)
            },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(login_res, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            var out_data = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZRUTHU_CP_INVOICE_FMResponse'][0]['INVOICE_TAB'][0]['item']
            
            if(out_data == null){
                console.log("emptyyyyyyyyyy")
            }
            else {
                out_data.forEach(function(table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(key != 'VKORG') {
                            table[key] = String(table[key]).replace(/^0+/, "");
                        }
                      });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(value == "" || value == null) {
                            table[key] = "TBA";
                        }
                      });

                    /////////////////   DATE    /////////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(key == 'FKDAT' || key == 'ERDAT' || key == 'GI_DATE') {
                            if(table[key] == "-00-00") {
                                table[key] = "TBA"
                            }
                            else {
                                const now = new Date(table[key]);
                                table[key] = date.format(now, 'DD-MM-YYYY');
                            }
                        }
                      })
                    });
                }
            // console.log(out_data);
            res.send(out_data);
        }
    });
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ${company_code}
// ${server_username}
app.post('/payage', async (req, res) => {
    var req_url = "https://KTINDHNA02.kaartech.com:8001/sap/bc/srt/rfc/sap/zruthu_cp_payage_ws/100/zruthu_cp_payage_ws/zruthu_cp_payage_ws";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_CP_PAY_AGING_FM>
                            <COMPANY_CODE>${company_code}</COMPANY_CODE>
                            <CUSTOMER_ID>${server_username}</CUSTOMER_ID>
                            <PAYMENT_TAB>
                                
                            </PAYMENT_TAB>
                        </urn:ZRUTHU_CP_PAY_AGING_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const login_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        path: req_url,
        headers:{
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(rfc_username + ':' + rfc_password)
            },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(login_res, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            var out_data = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZRUTHU_CP_PAY_AGING_FMResponse'][0]['PAYMENT_TAB'][0]['item']
            
            if(out_data == null){
                console.log("emptyyyyyyyyyy")
            }
            else {
                out_data.forEach(function(table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(key != 'COMP_CODE') {
                            table[key] = String(table[key]).replace(/^0+/, "");
                        }
                      });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(value == "" || value == null) {
                            table[key] = "TBA";
                        }
                      });

                    /////////////////   DATE    /////////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(key == 'PSTNG_DATE' || key == 'DOC_DATE' || key == 'ENTRY_DATE'
                            || key == 'BLINE_DATE') {
                            if(table[key] == "-00-00") {
                                table[key] = "TBA"
                            }
                            else {
                                const now = new Date(table[key]);
                                table[key] = date.format(now, 'DD-MM-YYYY');
                            }
                        }
                      })
                    });
                }
            // console.log(out_data);
            res.send(out_data);
        }
    });
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/cred-deb', async (req, res) => {
    var req_url = "https://KTINDHNA02.kaartech.com:8001/sap/bc/srt/rfc/sap/zruthu_cp_cred_deb_ws/100/zruthu_cp_cred_deb_ws/zruthu_cp_cred_deb_ws";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                      <soapenv:Header/>
                      <soapenv:Body>
                          <urn:ZRUTHU_CP_CRED_DEB_FM>
                              <CRED_TAB>
                              
                              </CRED_TAB>
                              <CUSTOMER_ID>${server_username}</CUSTOMER_ID>
                              <DEB_TAB>
                              
                              </DEB_TAB>
                          </urn:ZRUTHU_CP_CRED_DEB_FM>
                      </soapenv:Body>
                      </soapenv:Envelope>`
  
    const login_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        path: req_url,
        headers:{
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(rfc_username + ':' + rfc_password)
            },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())
  
    xml2js.parseString(login_res, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            var cred_data = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZRUTHU_CP_CRED_DEB_FMResponse'][0]['CRED_TAB'][0]['item']
            var deb_data = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZRUTHU_CP_CRED_DEB_FMResponse'][0]['DEB_TAB'][0]['item']
            

            if(cred_data == null && deb_data == null){
                console.log("emptyyyyyyyyyy")
            }
            else {
                ///////////////    CREDIT     //////////////
                cred_data.forEach(function(table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(key != 'VKORG') {
                            table[key] = String(table[key]).replace(/^0+/, "");
                        }
                      });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(value == "" || value == null) {
                            table[key] = "TBA";
                        }
                      });

                    /////////////////   DATE    /////////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(key == 'FKDAT' || key == 'ERDAT') {
                            if(table[key] == "-00-00") {
                                table[key] = "TBA"
                            }
                            else {
                                const now = new Date(table[key]);
                                table[key] = date.format(now, 'DD-MM-YYYY');
                            }
                        }
                      })
                    });

                    ///////////////    DEBIT     //////////////
                    deb_data.forEach(function(table) {

                        /////////////   Preceeding 0's    ////////////////
                        Object.entries(table).forEach(([key, value]) => {
                            if(key != 'VKORG') {
                                table[key] = String(table[key]).replace(/^0+/, "");
                            }
                          });
    
                        /////////////   Empty replace    /////////////////
                        Object.entries(table).forEach(([key, value]) => {
                            if(value == "" || value == null) {
                                table[key] = "TBA";
                            }
                          });
    
                        /////////////////   DATE    /////////////////////
                        Object.entries(table).forEach(([key, value]) => {
                            if(key == 'FKDAT' || key == 'ERDAT') {
                                if(table[key] == "-00-00") {
                                    table[key] = "TBA"
                                }
                                else {
                                    const now = new Date(table[key]);
                                    table[key] = date.format(now, 'DD-MM-YYYY');
                                }
                            }
                          })
                        });
                    }
            var out_data =[cred_data, deb_data]
            // console.log(out_data);
            res.send(out_data);
        }
    });
  });


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.listen(PORT, () => {
    console.log("server listening on 3030");
  });